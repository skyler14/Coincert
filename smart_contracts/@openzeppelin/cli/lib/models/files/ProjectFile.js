"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const upgrades_1 = require("@openzeppelin/upgrades");
const Dependency_1 = __importDefault(require("../dependency/Dependency"));
const ManifestVersion_1 = require("./ManifestVersion");
const constants_1 = require("./constants");
exports.PROJECT_FILE_NAME = 'project.json';
exports.PROJECT_FILE_PATH = path_1.default.join(constants_1.OPEN_ZEPPELIN_FOLDER, exports.PROJECT_FILE_NAME);
exports.LEGACY_PROJECT_FILE_NAME = 'zos.json';
class ProjectFile {
    constructor(filePath = null) {
        const defaultData = {
            manifestVersion: ManifestVersion_1.MANIFEST_VERSION,
        };
        this.filePath = ProjectFile.getExistingFilePath(process.cwd(), filePath);
        if (this.filePath) {
            try {
                this.data = upgrades_1.FileSystem.parseJsonIfExists(this.filePath);
                // if we failed to read and parse project file
            }
            catch (e) {
                e.message = `Failed to parse '${path_1.default.resolve(this.filePath)}' file. Please make sure that ${this.filePath} is a valid JSON file. Details: ${e.message}.`;
                throw e;
            }
        }
        this.filePath = this.filePath || exports.PROJECT_FILE_PATH;
        this.data = this.data || defaultData;
        ManifestVersion_1.checkVersion(this.data.manifestVersion || this.data.zosversion, this.filePath);
        if (!this.data.contracts)
            this.data.contracts = {};
        if (!this.data.dependencies)
            this.data.dependencies = {};
    }
    static getLinkedDependencies(filePath = null) {
        const project = new ProjectFile(filePath);
        if (!project)
            return [];
        return project.linkedDependencies;
    }
    exists() {
        return upgrades_1.FileSystem.exists(this.filePath);
    }
    get root() {
        return path_1.default.dirname(this.filePath);
    }
    set manifestVersion(version) {
        if (this.data.manifestVersion) {
            this.data.manifestVersion = version;
        }
        else {
            this.data.zosversion = version;
        }
    }
    set publish(publish) {
        this.data.publish = !!publish;
    }
    set name(name) {
        this.data.name = name;
    }
    get name() {
        return this.data.name;
    }
    set telemetryOptIn(optIn) {
        this.data.telemetryOptIn = optIn;
    }
    get telemetryOptIn() {
        return this.data.telemetryOptIn;
    }
    set version(version) {
        this.data.version = version;
    }
    get version() {
        return this.data.version;
    }
    set contracts(contracts) {
        this.data.contracts = contracts;
    }
    get contracts() {
        return this.data.contracts || {};
    }
    get dependencies() {
        return this.data.dependencies || {};
    }
    get dependenciesNames() {
        return Object.keys(this.dependencies);
    }
    getDependencyVersion(name) {
        return this.dependencies[name];
    }
    hasDependency(name) {
        return !!this.dependencies[name];
    }
    hasDependencies() {
        return !lodash_isempty_1.default(this.dependencies);
    }
    get contractAliases() {
        return Object.keys(this.contracts);
    }
    get contractNames() {
        return Object.values(this.contracts);
    }
    get isPublished() {
        return !!this.data.publish;
    }
    get compilerOptions() {
        // Awkward destructuring is due to https://github.com/microsoft/TypeScript/issues/26235
        const config = this.data.compiler;
        const manager = config && config.manager;
        const version = config && config.solcVersion;
        const inputDir = config && config.contractsDir;
        const outputDir = config && config.artifactsDir;
        const compilerSettings = config && config.compilerSettings;
        const evmVersion = compilerSettings && compilerSettings.evmVersion;
        const optimizer = compilerSettings && compilerSettings.optimizer;
        return {
            manager,
            inputDir,
            outputDir,
            evmVersion,
            version,
            optimizer: {
                enabled: optimizer && optimizer.enabled,
                runs: optimizer && optimizer.runs && parseInt(optimizer.runs),
            },
        };
    }
    get linkedDependencies() {
        const dependencies = this.data.dependencies;
        if (!dependencies)
            return [];
        return Object.keys(dependencies).map(depName => `${depName}@${dependencies[depName]}`);
    }
    setCompilerOptions(options) {
        const { manager, version, outputDir, inputDir, evmVersion, optimizer } = options;
        const configOptions = {
            manager,
            solcVersion: version,
            artifactsDir: outputDir,
            contractsDir: inputDir,
            compilerSettings: {
                evmVersion,
                optimizer: {
                    enabled: optimizer && optimizer.enabled,
                    runs: optimizer && optimizer.runs && optimizer.runs.toString(),
                },
            },
        };
        this.data.compiler =
            manager === 'trufle' ? { manager: 'truffle' } : lodash_pickby_1.default(Object.assign(Object.assign({}, this.data.compiler), configOptions));
    }
    contract(alias) {
        return this.contracts[alias];
    }
    hasName(name) {
        return this.name === name;
    }
    dependencyMatches(name, version) {
        return this.hasDependency(name) && Dependency_1.default.satisfiesVersion(version, this.getDependencyVersion(name));
    }
    isCurrentVersion(version) {
        return this.version === version;
    }
    hasContract(alias) {
        return !!this.contract(alias);
    }
    hasContracts() {
        return !lodash_isempty_1.default(this.contracts);
    }
    setDependency(name, version) {
        if (!this.data.dependencies)
            this.data.dependencies = {};
        this.data.dependencies[name] = version;
    }
    unsetDependency(name) {
        if (!this.data.dependencies)
            return;
        delete this.data.dependencies[name];
    }
    addContract(alias, name) {
        this.data.contracts[alias] = name || alias;
    }
    unsetContract(alias) {
        delete this.data.contracts[alias];
    }
    write() {
        if (this.hasChanged()) {
            const exists = this.exists();
            upgrades_1.FileSystem.writeJson(this.filePath, this.data);
            upgrades_1.Loggy.onVerbose(__filename, 'write', 'write-project-json', exists ? `Updated ${this.filePath}` : `Created ${this.filePath}`);
        }
    }
    static getExistingFilePath(dir = process.cwd(), ...paths) {
        // TODO-v3: remove legacy project file support
        // Prefer the new format over the old one
        return [...paths, `${dir}/${exports.PROJECT_FILE_PATH}`, `${dir}/${exports.LEGACY_PROJECT_FILE_NAME}`].find(upgrades_1.FileSystem.exists);
    }
    hasChanged() {
        const currentPackgeFile = upgrades_1.FileSystem.parseJsonIfExists(this.filePath);
        return !lodash_isequal_1.default(this.data, currentPackgeFile);
    }
}
exports.default = ProjectFile;
//# sourceMappingURL=ProjectFile.js.map