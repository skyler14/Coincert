"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const solidity_1 = require("../../../utils/solidity");
const is_url_1 = __importDefault(require("is-url"));
/**
 * This function accepts root files to be searched for and resolves the sources, finds the imports in each source and traverses the whole dependency tree gathering absolute and uri paths
 * @param roots
 * @param workingDir
 * @param resolver
 */
function gatherDependencyTree(roots, workingDir, resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const alreadyImported = new Set();
        /**
         * This function traverses the depedency tree and calculates absolute paths for each import on the way storing each file in in a global array
         * @param file File in a depedency that should now be traversed
         * @returns An absolute path for the requested file
         */
        function dfs(file) {
            return __awaiter(this, void 0, void 0, function* () {
                const url = yield resolver.resolve(file.uri, file.searchCwd);
                if (alreadyImported.has(url)) {
                    return url;
                }
                const resolvedFile = yield resolver.require(file.uri, file.searchCwd);
                alreadyImported.add(url);
                const foundImportURIs = solidity_1.getImports(resolvedFile.source);
                const fileNode = Object.assign({ uri: file.uri, imports: [] }, resolvedFile);
                const resolvedCwd = path_1.default.dirname(url);
                for (const importUri of foundImportURIs) {
                    const importUrl = yield dfs({ searchCwd: resolvedCwd, uri: importUri });
                    fileNode.imports.push({ uri: importUri, url: importUrl });
                }
                result.push(fileNode);
                return resolvedFile.url;
            });
        }
        yield Promise.all(roots.map(what => dfs({ searchCwd: workingDir, uri: what })));
        return result;
    });
}
function stripNodes(nodes) {
    return nodes.map(node => {
        return { url: node.url, source: node.source, provider: node.provider };
    });
}
/**
 * Starts with roots and traverses the whole depedency tree of imports, returning an array of sources
 * @param roots
 * @param workingDir What's the starting working dir for resolving relative imports in roots
 * @param resolver
 */
function gatherSources(roots, workingDir, resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const queue = [];
        const alreadyImported = new Set();
        if (workingDir !== '') {
            workingDir += path_1.default.sep;
        }
        const absoluteRoots = roots.map(what => resolvePath(workingDir, what));
        for (const absWhat of absoluteRoots) {
            queue.push({ cwd: workingDir, file: absWhat, relativeTo: workingDir });
            alreadyImported.add(absWhat);
        }
        while (queue.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const fileData = queue.shift();
            const resolvedFile = yield resolveImportFile(resolver, fileData);
            const foundImports = solidity_1.getImports(resolvedFile.source);
            // if imported path starts with '.' we assume it's relative and return it's
            // path relative to resolved name of the file that imported it
            // if not - return the same name it was imported with
            let relativePath;
            if (fileData.file[0] === '.') {
                relativePath = resolvePath(fileData.relativeTo, fileData.file);
                result.push({
                    url: relativePath,
                    source: resolvedFile.source,
                    provider: resolvedFile.provider,
                });
            }
            else {
                relativePath = fileData.file;
                result.push({
                    url: relativePath,
                    source: resolvedFile.source,
                    provider: resolvedFile.provider,
                });
            }
            const fileParentDir = path_1.default.dirname(resolvedFile.url);
            for (const foundImport of foundImports) {
                let importName;
                // If it's relative, resolve it; otherwise, pass through
                if (foundImport[0] === '.') {
                    importName = resolvePath(relativePath, foundImport);
                }
                else {
                    importName = foundImport;
                }
                if (!alreadyImported.has(importName)) {
                    alreadyImported.add(importName);
                    queue.push({
                        cwd: fileParentDir,
                        file: foundImport,
                        relativeTo: relativePath,
                    });
                }
            }
        }
        return result;
    });
}
exports.gatherSources = gatherSources;
function resolvePath(workingDir, relativePath) {
    // If the working dir is an URL (a file imported from an URL location)
    // or the relative path is an URL (an URL imported from a local file)
    // use url.resolve, which will work in both cases.
    // > url.resolve('/local/folder/', 'http://example.com/myfile.sol')
    // 'http://example.com/myfile.sol'
    // > url.resolve('http://example.com/', 'myfile.sol')
    // 'http://example.com/myfile.sol'
    //
    // If not, use path.resolve, since using url.resolve will escape certain
    // charaters (e.g. a space as an %20), breaking the path
    // > url.resolve('/local/path/with spaces/', 'myfile.sol')
    // '/local/path/with%20spaces/myfile.sol'
    return is_url_1.default(workingDir) || is_url_1.default(relativePath)
        ? url_1.default.resolve(workingDir, relativePath)
        : path_1.default.resolve(path_1.default.dirname(workingDir), relativePath);
}
function resolveImportFile(resolver, fileData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield resolver.require(fileData.file, fileData.cwd);
        }
        catch (err) {
            if (err.message.startsWith('None of the sub-resolvers resolved')) {
                // If the import failed, we retry it from the project root,
                // in order to support `import "contracts/folder/Contract.sol";`
                // See https://github.com/zeppelinos/zos/issues/1024
                if (fileData.cwd !== process.cwd() && fileData.file[0] !== '.') {
                    return resolveImportFile(resolver, Object.assign(Object.assign({}, fileData), { cwd: process.cwd() }));
                }
                const cwd = path_1.default.relative(process.cwd(), fileData.cwd);
                const cwdDesc = cwd.length === 0 ? 'the project' : `folder ${cwd}`;
                const relativeTo = path_1.default.relative(process.cwd(), fileData.relativeTo);
                err.message = `Could not find file ${fileData.file} in ${cwdDesc} (imported from ${relativeTo})`;
            }
            throw err;
        }
    });
}
/**
 * This function gathers sources and **REWRITES IMPORTS** inside the source files into resolved, absolute paths instead of using shortcut forms
 * Because the remapping api in solc is not compatible with multiple existing projects and frameworks, changing relative paths to absolute paths
 * makes us avoid any need for finding imports after starting the solc compilation
 * @param roots
 * @param workingDir What's the starting working dir for resolving relative imports in roots
 * @param resolver
 */
function gatherSourcesAndCanonizeImports(roots, workingDir, resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        function canonizeFile(file) {
            file.imports.forEach(i => (file.source = file.source.replace(i.uri, i.url)));
        }
        const sources = yield gatherDependencyTree(roots, workingDir, resolver);
        sources.forEach(canonizeFile);
        return stripNodes(sources);
    });
}
exports.gatherSourcesAndCanonizeImports = gatherSourcesAndCanonizeImports;
//# sourceMappingURL=ResolverEngineGatherer.js.map