import { Contract } from '@openzeppelin/upgrades';
import ProjectFile from './ProjectFile';
import { ProxyType } from '../../scripts/interfaces';
export interface ContractInterface {
    address?: string;
    constructorCode?: string;
    localBytecodeHash?: string;
    deployedBytecodeHash?: string;
    bodyBytecodeHash?: string;
    types?: any;
    storage?: any;
    warnings?: any;
    [id: string]: any;
}
interface SolidityLibInterface {
    address: string;
    constructorCode: string;
    bodyBytecodeHash: string;
    localBytecodeHash: string;
    deployedBytecodeHash: string;
}
export interface ProxyInterface {
    alias?: string;
    package?: string;
    contract?: any;
    address?: string;
    version?: string;
    implementation?: string;
    admin?: string;
    kind?: ProxyType;
}
export interface DependencyInterface {
    name?: string;
    package?: string;
    version?: string;
    customDeploy?: boolean;
}
interface AddressWrapper {
    address?: string;
}
interface NetworkFileData {
    contracts: {
        [contractAlias: string]: ContractInterface;
    };
    solidityLibs: {
        [libAlias: string]: SolidityLibInterface;
    };
    proxies: {
        [contractName: string]: ProxyInterface[];
    };
    manifestVersion?: string;
    zosversion?: string;
    proxyAdmin: AddressWrapper;
    proxyFactory: AddressWrapper;
    app: AddressWrapper;
    package: AddressWrapper;
    provider: AddressWrapper;
    version: string;
    frozen: boolean;
    dependencies: {
        [dependencyName: string]: DependencyInterface;
    };
}
export default class NetworkFile {
    projectFile: ProjectFile;
    network: any;
    filePath: string;
    data: NetworkFileData;
    static getManifestVersion(network: string): string | null;
    constructor(projectFile: ProjectFile, network: any, filePath?: string);
    manifestVersion: string;
    version: string;
    contracts: {
        [contractAlias: string]: ContractInterface;
    };
    solidityLibs: {
        [libAlias: string]: SolidityLibInterface;
    };
    frozen: boolean;
    proxyAdmin: AddressWrapper;
    proxyFactory: AddressWrapper;
    app: AddressWrapper;
    provider: AddressWrapper;
    package: AddressWrapper;
    readonly proxyAdminAddress: string;
    readonly proxyFactoryAddress: string;
    readonly appAddress: string;
    readonly packageAddress: string;
    readonly providerAddress: string;
    readonly isPublished: boolean;
    readonly contractAliases: string[];
    addSolidityLib(libName: string, instance: Contract): void;
    unsetSolidityLib(libName: string): void;
    setSolidityLib(alias: string, value: SolidityLibInterface): void;
    solidityLib(libName: string): SolidityLibInterface;
    getSolidityLibs(libs: string[]): {
        [libAlias: string]: string;
    };
    hasSolidityLib(libName: string): boolean;
    solidityLibsMissing(libs: any): string[];
    getSolidityLibOrContract(aliasOrName: string): ContractInterface | SolidityLibInterface;
    hasSolidityLibOrContract(aliasOrName: string): boolean;
    updateImplementation(aliasOrName: string, fn: (source: ContractInterface | SolidityLibInterface) => ContractInterface | SolidityLibInterface): void;
    readonly dependencies: {
        [dependencyName: string]: DependencyInterface;
    };
    readonly dependenciesNames: string[];
    getDependency(name: string): DependencyInterface | null;
    hasDependency(name: string): boolean;
    hasDependencies(): boolean;
    getProxies({ package: packageName, contract, address, kind }?: ProxyInterface): ProxyInterface[];
    getProxy(address: string): ProxyInterface;
    contract(alias: string): ContractInterface;
    contractAliasesMissingFromPackage(): any[];
    isCurrentVersion(version: string): boolean;
    hasContract(alias: string): boolean;
    hasContracts(): boolean;
    hasProxies(aFilter?: any): boolean;
    hasMatchingVersion(): boolean;
    dependenciesNamesMissingFromPackage(): any[];
    dependencyHasCustomDeploy(name: string): boolean;
    dependencySatisfiesVersionRequirement(name: string): boolean;
    dependencyHasMatchingCustomDeploy(name: string): boolean;
    hasSameBytecode(alias: string, klass: any): boolean;
    setDependency(name: string, { package: thepackage, version, customDeploy }?: DependencyInterface): void;
    unsetDependency(name: string): void;
    updateDependency(name: string, fn: (...args: any[]) => any): void;
    addContract(alias: string, instance: Contract, { warnings, types, storage }?: {
        warnings?: any;
        types?: any;
        storage?: any;
    }): void;
    setContract(alias: string, value: ContractInterface): void;
    unsetContract(alias: string): void;
    setProxies(packageName: string, alias: string, value: ProxyInterface[]): void;
    addProxy(thepackage: string, alias: string, info: ProxyInterface): void;
    removeProxy(thepackage: string, alias: string, address: string): void;
    updateProxy({ package: proxyPackageName, contract: proxyContractName, address: proxyAddress }: ProxyInterface, fn: (...args: any[]) => any): void;
    _indexOfProxy(fullname: string, address: string): number;
    _proxiesOf(fullname: string): ProxyInterface[];
    write(): void;
    static getExistingFilePath(network: string, dir?: string, ...paths: string[]): string;
    private hasChanged;
    private exists;
}
export {};
