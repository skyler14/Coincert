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
const lodash_map_1 = __importDefault(require("lodash.map"));
const lodash_uniq_1 = __importDefault(require("lodash.uniq"));
const lodash_flatten_1 = __importDefault(require("lodash.flatten"));
const lodash_frompairs_1 = __importDefault(require("lodash.frompairs"));
const semver_1 = __importDefault(require("semver"));
const npm_programmatic_1 = __importDefault(require("npm-programmatic"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const upgrades_1 = require("@openzeppelin/upgrades");
const ProjectFile_1 = __importDefault(require("../files/ProjectFile"));
const NetworkFile_1 = __importDefault(require("../files/NetworkFile"));
const path_1 = require("path");
class Dependency {
    constructor(name, requirement) {
        this.name = name;
        this._networkFiles = {};
        const projectVersion = this.projectFile.version;
        this.validateSatisfiesVersion(projectVersion, requirement);
        this.version = projectVersion;
        this.nameAndVersion = `${name}@${projectVersion}`;
        this.requirement = requirement || tryWithCaret(projectVersion);
    }
    static fromNameWithVersion(nameAndVersion) {
        const [name, version] = this.splitNameAndVersion(nameAndVersion);
        return new this(name, version);
    }
    static satisfiesVersion(version, requirement) {
        return !requirement || version === requirement || semver_1.default.satisfies(semver_1.default.coerce(version), requirement);
    }
    static fetchVersionFromNpm(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const execAsync = util_1.promisify(child_process_1.exec);
            try {
                const { stdout } = yield execAsync(`npm view ${name}@latest version`);
                const version = new semver_1.default.SemVer(stdout.trim());
                return `${name}@^${version.major}.${version.minor}.0`;
            }
            catch (error) {
                return name;
            }
        });
    }
    static hasDependenciesForDeploy(network, packageFileName, networkFileName) {
        const project = new ProjectFile_1.default(packageFileName);
        const dependencies = project.linkedDependencies;
        const networkFile = new NetworkFile_1.default(project, network, networkFileName);
        const hasDependenciesForDeploy = dependencies.find((depNameAndVersion) => {
            const dependency = Dependency.fromNameWithVersion(depNameAndVersion);
            return !(dependency.isDeployedOnNetwork(network) || networkFile.dependencyHasMatchingCustomDeploy(dependency.name));
        });
        return !!hasDependenciesForDeploy;
    }
    static install(nameAndVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            upgrades_1.Loggy.spin(__filename, 'install', `install-dependency-${nameAndVersion}`, `Installing ${nameAndVersion} via npm`);
            yield npm_programmatic_1.default.install([nameAndVersion], { save: true, cwd: process.cwd() });
            upgrades_1.Loggy.succeed(`install-dependency-${nameAndVersion}`, `Dependency ${nameAndVersion} installed`);
            return this.fromNameWithVersion(nameAndVersion);
        });
    }
    static splitNameAndVersion(nameAndVersion) {
        const parts = nameAndVersion.split('@');
        if (parts[0].length === 0) {
            parts.shift();
            parts[0] = `@${parts[0]}`;
        }
        return [parts[0], parts[1]];
    }
    deploy(txParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = semver_1.default.coerce(this.version).toString();
            const project = yield upgrades_1.PackageProject.fetchOrDeploy(version, txParams, {});
            // REFACTOR: Logic for filling in solidity libraries is partially duplicated from network base controller,
            // this should all be handled at the Project level. Consider adding a setImplementations (plural) method
            // to Projects, which handle library deployment and linking for a set of contracts altogether.
            const contracts = lodash_map_1.default(this.projectFile.contracts, (contractName, contractAlias) => [
                upgrades_1.Contracts.getFromNodeModules(this.name, contractName),
                contractAlias,
            ]);
            const pipeline = [
                someContracts => lodash_map_1.default(someContracts, ([contract]) => upgrades_1.getSolidityLibNames(contract.schema.bytecode)),
                someContracts => lodash_flatten_1.default(someContracts),
                someContracts => lodash_uniq_1.default(someContracts),
            ];
            const libraryNames = pipeline.reduce((xs, f) => f(xs), contracts);
            const libraries = lodash_frompairs_1.default(yield Promise.all(lodash_map_1.default(libraryNames, (libraryName) => __awaiter(this, void 0, void 0, function* () {
                const implementation = yield project.setImplementation(upgrades_1.Contracts.getFromNodeModules(this.name, libraryName), libraryName);
                return [libraryName, implementation.address];
            }))));
            yield Promise.all(lodash_map_1.default(contracts, ([contract, contractAlias]) => __awaiter(this, void 0, void 0, function* () {
                contract.link(libraries);
                yield project.setImplementation(contract, contractAlias);
            })));
            return project;
        });
    }
    get projectFile() {
        if (!this._projectFile) {
            const filePath = ProjectFile_1.default.getExistingFilePath(this.getDependencyFolder());
            if (!filePath) {
                throw new Error(`Could not find an .openzeppelin/project.json or zos.json file for '${this.name}'`);
            }
            this._projectFile = new ProjectFile_1.default(filePath);
        }
        return this._projectFile;
    }
    getNetworkFile(network) {
        if (!this._networkFiles[network]) {
            const filePath = this.getExistingNetworkFilePath(network);
            if (!upgrades_1.FileSystem.exists(filePath)) {
                throw Error(`Could not find a project file for network '${network}' for '${this.name}'`);
            }
            this._networkFiles[network] = new NetworkFile_1.default(this.projectFile, network, filePath);
            this.validateSatisfiesVersion(this._networkFiles[network].version, this.requirement);
        }
        return this._networkFiles[network];
    }
    isDeployedOnNetwork(network) {
        const filePath = this.getExistingNetworkFilePath(network);
        if (!upgrades_1.FileSystem.exists(filePath))
            return false;
        return !!this.getNetworkFile(network).packageAddress;
    }
    getDependencyFolder() {
        try {
            return path_1.dirname(require.resolve(`${this.name}/package.json`, { paths: [process.cwd()] }));
        }
        catch (err) {
            throw new Error(`Could not find dependency ${this.name}.`);
        }
    }
    getExistingNetworkFilePath(network) {
        return NetworkFile_1.default.getExistingFilePath(network, this.getDependencyFolder());
    }
    validateSatisfiesVersion(version, requirement) {
        if (!Dependency.satisfiesVersion(version, requirement)) {
            throw Error(`Required dependency version ${requirement} does not match version ${version}`);
        }
    }
}
exports.default = Dependency;
function tryWithCaret(version) {
    const cleaned = semver_1.default.clean(version);
    return cleaned ? `^${cleaned}` : version;
}
//# sourceMappingURL=Dependency.js.map