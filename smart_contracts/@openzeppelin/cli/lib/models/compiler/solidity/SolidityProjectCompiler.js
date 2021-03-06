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
const lodash_max_1 = __importDefault(require("lodash.max"));
const lodash_maxby_1 = __importDefault(require("lodash.maxby"));
const lodash_pick_1 = __importDefault(require("lodash.pick"));
const lodash_omitby_1 = __importDefault(require("lodash.omitby"));
const lodash_isundefined_1 = __importDefault(require("lodash.isundefined"));
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const upgrades_1 = require("@openzeppelin/upgrades");
const SolidityContractsCompiler_1 = require("./SolidityContractsCompiler");
const resolver_engine_imports_fs_1 = require("@openzeppelin/resolver-engine-imports-fs");
const ResolverEngineGatherer_1 = require("./ResolverEngineGatherer");
const solidity_1 = require("../../../utils/solidity");
const try_1 = require("../../../utils/try");
function compileProject(options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectCompiler = new SolidityProjectCompiler(Object.assign(Object.assign({}, options), { inputDir: options.inputDir || upgrades_1.Contracts.getLocalContractsDir(), outputDir: options.outputDir || upgrades_1.Contracts.getLocalBuildDir() }));
        yield projectCompiler.call();
        return {
            contracts: projectCompiler.contracts,
            compilerVersion: projectCompiler.compilerVersion,
        };
    });
}
exports.compileProject = compileProject;
class SolidityProjectCompiler {
    constructor(options = {}) {
        this.roots = [];
        this.contracts = [];
        this.compilerOutput = [];
        this.options = options;
    }
    get inputDir() {
        return this.options.inputDir;
    }
    get outputDir() {
        return this.options.outputDir;
    }
    call() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._loadSoliditySourcesFromDir();
            yield this._loadDependencies();
            if (this.contracts.length === 0) {
                upgrades_1.Loggy.noSpin(__filename, 'call', 'compile-contracts', 'No contracts found to compile.');
                return;
            }
            yield this._resolveCompilerVersion();
            if (!this._shouldCompile()) {
                upgrades_1.Loggy.noSpin(__filename, 'call', `compile-contracts`, 'Nothing to compile, all contracts are up to date.');
                return;
            }
            upgrades_1.Loggy.spin(__filename, 'call', 'compile-contracts', `Compiling contracts with solc ${this.compilerVersion.version} (${this.compilerVersion.build})`);
            this.compilerOutput = yield SolidityContractsCompiler_1.compileWith(this.compilerVersion, this.contracts, this.options);
            yield this._writeOutput();
            upgrades_1.Loggy.succeed('compile-contracts', `Compiled contracts with solc ${this.compilerVersion.version} (${this.compilerVersion.build})`);
        });
    }
    _loadSoliditySourcesFromDir(dir = this.inputDir) {
        if (!fs_1.existsSync(dir) || !fs_1.lstatSync(dir).isDirectory)
            return;
        // TODO: Replace by a glob expression
        fs_1.readdirSync(dir).forEach(fileName => {
            const filePath = path_1.default.resolve(dir, fileName);
            if (fs_1.lstatSync(filePath).isDirectory()) {
                this._loadSoliditySourcesFromDir(filePath);
            }
            else if (path_1.default.extname(filePath).toLowerCase() === '.sol') {
                this.roots.push(filePath);
            }
        });
    }
    _loadDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const importFiles = yield ResolverEngineGatherer_1.gatherSources(this.roots, this.inputDir, resolver_engine_imports_fs_1.ImportsFsEngine());
            const cwd = process.cwd();
            this.contracts = importFiles.map(file => ({
                fileName: path_1.default.basename(file.url),
                filePath: path_1.default.isAbsolute(file.url) ? path_1.default.relative(cwd, file.url) : file.url,
                source: file.source,
                lastModified: try_1.tryFunc(() => fs_1.statSync(file.url).mtimeMs),
            }));
        });
    }
    _resolveCompilerVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.compilerVersion = yield SolidityContractsCompiler_1.resolveCompilerVersion(this.contracts, this.options);
        });
    }
    _shouldCompile() {
        if (this.options.force)
            return true;
        const artifacts = this._listArtifacts();
        const artifactsWithMtimes = artifacts.map(artifact => ({
            artifact,
            mtime: fs_1.statSync(artifact).mtimeMs,
        }));
        // We pick a single artifact (the most recent one) to get the version it was compiled with
        const latestArtifact = lodash_maxby_1.default(artifactsWithMtimes, 'mtime');
        const latestSchema = latestArtifact && fs_extra_1.readJsonSync(latestArtifact.artifact);
        const artifactCompiledVersion = latestSchema && latestSchema.compiler.version;
        const artifactSettings = latestSchema && lodash_pick_1.default(latestSchema.compiler, 'evmVersion', 'optimizer');
        // Build current settings based on defaults
        const currentSettings = Object.assign({ optimizer: SolidityContractsCompiler_1.DEFAULT_OPTIMIZER, evmVersion: SolidityContractsCompiler_1.defaultEVMVersion(this.compilerVersion.longVersion) }, lodash_omitby_1.default(this.options, lodash_isundefined_1.default));
        // Gather artifacts vs sources modified times
        const maxArtifactsMtimes = latestArtifact && latestArtifact.mtime;
        const maxSourcesMtimes = lodash_max_1.default(this.contracts.map(({ lastModified }) => lastModified));
        // Compile if there are no previous artifacts, or no mtimes could be collected for sources,
        // or sources were modified after artifacts, or compiler version changed, or compiler settings changed
        return (!maxArtifactsMtimes ||
            !maxSourcesMtimes ||
            maxArtifactsMtimes < maxSourcesMtimes ||
            !artifactCompiledVersion ||
            !solidity_1.compilerVersionsMatch(artifactCompiledVersion, this.compilerVersion.longVersion) ||
            !solidity_1.compilerSettingsMatch(currentSettings, artifactSettings));
    }
    _writeOutput() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create directory if not exists, or clear it of artifacts if it does,
            // preserving networks deployment info
            const networksInfo = {};
            if (!fs_1.existsSync(this.outputDir)) {
                fs_extra_1.ensureDirSync(this.outputDir);
            }
            else {
                const artifacts = this._listArtifacts();
                yield Promise.all(artifacts.map((filePath) => __awaiter(this, void 0, void 0, function* () {
                    const name = path_1.default.basename(filePath, '.json');
                    const schema = yield fs_extra_1.readJSON(filePath);
                    if (schema.networks)
                        networksInfo[name] = schema.networks;
                    yield fs_extra_1.unlink(filePath);
                })));
            }
            // Write compiler output, saving networks info if present
            yield Promise.all(this.compilerOutput.map((data) => __awaiter(this, void 0, void 0, function* () {
                const name = data.contractName;
                const buildFileName = `${this.outputDir}/${name}.json`;
                if (networksInfo[name])
                    Object.assign(data, { networks: networksInfo[name] });
                yield fs_extra_1.writeJson(buildFileName, data, { spaces: 2 });
            })));
        });
    }
    _listArtifacts() {
        if (!fs_1.existsSync(this.outputDir))
            return [];
        return fs_1.readdirSync(this.outputDir)
            .map(fileName => path_1.default.resolve(this.outputDir, fileName))
            .filter(fileName => !fs_1.lstatSync(fileName).isDirectory())
            .filter(fileName => path_1.default.extname(fileName) === '.json');
    }
}
//# sourceMappingURL=SolidityProjectCompiler.js.map