import { ProjectCompilerOptions } from '../compiler/solidity/SolidityProjectCompiler';
interface ConfigFileCompilerOptions {
    manager: string;
    solcVersion: string;
    contractsDir: string;
    artifactsDir: string;
    compilerSettings: {
        evmVersion: string;
        optimizer: {
            enabled: boolean;
            runs?: string;
        };
    };
}
interface ProjectFileData {
    name: string;
    version: string;
    manifestVersion?: string;
    zosversion?: string;
    dependencies: {
        [name: string]: string;
    };
    contracts: {
        [alias: string]: string;
    };
    publish: boolean;
    compiler: ConfigFileCompilerOptions;
    telemetryOptIn?: boolean;
}
export declare const PROJECT_FILE_NAME = "project.json";
export declare const PROJECT_FILE_PATH: string;
export declare const LEGACY_PROJECT_FILE_NAME = "zos.json";
export default class ProjectFile {
    filePath: string;
    data: ProjectFileData;
    static getLinkedDependencies(filePath?: string): string[];
    constructor(filePath?: string);
    exists(): boolean;
    readonly root: string;
    manifestVersion: string;
    publish: boolean;
    name: string;
    telemetryOptIn: boolean;
    version: string;
    contracts: {
        [alias: string]: string;
    };
    readonly dependencies: {
        [name: string]: string;
    };
    readonly dependenciesNames: string[];
    getDependencyVersion(name: string): string;
    hasDependency(name: string): boolean;
    hasDependencies(): boolean;
    readonly contractAliases: string[];
    readonly contractNames: string[];
    readonly isPublished: boolean;
    readonly compilerOptions: ProjectCompilerOptions;
    readonly linkedDependencies: string[];
    setCompilerOptions(options: ProjectCompilerOptions): void;
    contract(alias: string): string;
    hasName(name: string): boolean;
    dependencyMatches(name: string, version: string): boolean;
    isCurrentVersion(version: string): boolean;
    hasContract(alias: string): boolean;
    hasContracts(): boolean;
    setDependency(name: string, version: string): void;
    unsetDependency(name: string): void;
    addContract(alias: string, name: string | undefined): void;
    unsetContract(alias: string): void;
    write(): void;
    static getExistingFilePath(dir?: string, ...paths: string[]): string;
    private hasChanged;
}
export {};
