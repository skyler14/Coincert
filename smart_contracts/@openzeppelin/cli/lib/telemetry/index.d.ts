import { Params } from '../scripts/interfaces';
export declare type CommandData = Params & {
    name: string;
    network?: string;
};
export interface UserEnvironment {
    platform: string;
    arch: string;
    nodeVersion: string;
    cliVersion: string;
    upgradesVersion?: string;
    web3Version?: string;
    truffleVersion?: string;
}
declare const _default: {
    DISABLE_TELEMETRY: boolean;
    report(commandName: string, options: Params, interactive: boolean): Promise<void>;
    sendToFirebase(uuid: string, commandData: {
        salt?: string;
        signature?: string;
        admin?: string;
        kind?: string;
        proxyAddress?: string;
        force?: string;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        methodName: string;
        methodArgs: ConcealedArray<string>;
        packageName?: string;
        contractAlias?: string;
        name: string;
    } | {
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        all?: string;
        proxyAddress?: string;
        force?: string;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        methodName: string;
        methodArgs: ConcealedArray<string>;
        packageName?: string;
        contractAlias?: string;
        name: string;
    } | {
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        dependencies?: ConcealedArray<string>;
        installDependencies?: string;
        name: string;
        network?: string;
    } | {
        name: string;
        version?: string;
        force?: string;
        publish?: string;
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        dependencies?: ConcealedArray<string>;
        installDependencies?: string;
        network?: string;
    } | {
        repoOrName: string;
        name: string;
        network?: string;
    } | {
        force?: string;
        reupload?: string;
        deployDependencies?: string;
        deployProxyAdmin?: string;
        deployProxyFactory?: string;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        apiKey: string;
        remote: string;
        optimizer?: string;
        optimizerRuns?: string;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        proxyAddress?: string;
        newAdmin?: string;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        packageName?: string;
        contractAlias?: string;
        name: string;
    } | {
        contractsData: ConcealedArray<import("../scripts/interfaces").ContractData>;
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        name: string;
        network?: string;
    } | {
        from?: string;
        close?: string;
        network?: string;
        timeout?: string;
        expires?: string;
        name: string;
    } | {
        version: string;
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        name: string;
        network?: string;
    } | {
        contracts: ConcealedArray<string>;
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        name: string;
        network?: string;
    } | {
        contractAlias: string;
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        name: string;
        network?: string;
    } | {
        dependencies: ConcealedArray<string>;
        projectFile?: {
            filePath: string;
            data: {
                name: string;
                version: string;
                manifestVersion?: string;
                zosversion?: string;
                dependencies: {
                    [x: string]: string;
                };
                contracts: {
                    [x: string]: string;
                };
                publish: string;
                compiler: {
                    manager: string;
                    solcVersion: string;
                    contractsDir: string;
                    artifactsDir: string;
                    compilerSettings: {
                        evmVersion: string;
                        optimizer: {
                            enabled: string;
                            runs?: string;
                        };
                    };
                };
                telemetryOptIn?: string;
            };
            exists: {};
            readonly root: string;
            manifestVersion: string;
            publish: string;
            name: string;
            telemetryOptIn: string;
            version: string;
            contracts: {
                [x: string]: string;
            };
            readonly dependencies: {
                [x: string]: string;
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependencyVersion: {};
            hasDependency: {};
            hasDependencies: {};
            readonly contractAliases: ConcealedArray<string>;
            readonly contractNames: ConcealedArray<string>;
            readonly isPublished: string;
            readonly compilerOptions: {
                manager?: string;
                inputDir?: string;
                outputDir?: string;
                force?: string;
                version?: string;
                optimizer?: {
                    enabled: string;
                    runs?: string;
                };
                evmVersion?: string;
            };
            readonly linkedDependencies: ConcealedArray<string>;
            setCompilerOptions: {};
            contract: {};
            hasName: {};
            dependencyMatches: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            setDependency: {};
            unsetDependency: {};
            addContract: {};
            unsetContract: {};
            write: {};
        };
        name: string;
        network?: string;
    } | {
        salt: string;
        sender?: string;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        to: string;
        value: string;
        txParams: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        unit?: string;
        from?: string;
        name: string;
        network?: string;
    } | {
        accountAddress: string;
        contractAddress?: string;
        name: string;
        network?: string;
    } | {
        proxyAddress: string;
        methodName: string;
        methodArgs: ConcealedArray<string>;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        proxyAddress: string;
        value?: string;
        gas?: string;
        methodName: string;
        methodArgs: ConcealedArray<string>;
        network: string;
        txParams?: {
            from?: string;
            value?: string;
            gas?: string;
            gasPrice?: string;
        };
        networkFile?: {
            projectFile: {
                filePath: string;
                data: {
                    name: string;
                    version: string;
                    manifestVersion?: string;
                    zosversion?: string;
                    dependencies: {
                        [x: string]: string;
                    };
                    contracts: {
                        [x: string]: string;
                    };
                    publish: string;
                    compiler: {
                        manager: string;
                        solcVersion: string;
                        contractsDir: string;
                        artifactsDir: string;
                        compilerSettings: {
                            evmVersion: string;
                            optimizer: {
                                enabled: string;
                                runs?: string;
                            };
                        };
                    };
                    telemetryOptIn?: string;
                };
                exists: {};
                readonly root: string;
                manifestVersion: string;
                publish: string;
                name: string;
                telemetryOptIn: string;
                version: string;
                contracts: {
                    [x: string]: string;
                };
                readonly dependencies: {
                    [x: string]: string;
                };
                readonly dependenciesNames: ConcealedArray<string>;
                getDependencyVersion: {};
                hasDependency: {};
                hasDependencies: {};
                readonly contractAliases: ConcealedArray<string>;
                readonly contractNames: ConcealedArray<string>;
                readonly isPublished: string;
                readonly compilerOptions: {
                    manager?: string;
                    inputDir?: string;
                    outputDir?: string;
                    force?: string;
                    version?: string;
                    optimizer?: {
                        enabled: string;
                        runs?: string;
                    };
                    evmVersion?: string;
                };
                readonly linkedDependencies: ConcealedArray<string>;
                setCompilerOptions: {};
                contract: {};
                hasName: {};
                dependencyMatches: {};
                isCurrentVersion: {};
                hasContract: {};
                hasContracts: {};
                setDependency: {};
                unsetDependency: {};
                addContract: {};
                unsetContract: {};
                write: {};
            };
            network: string | ConcealedArray<unknown> | {
                [x: string]: string | ConcealedArray<unknown> | any;
            };
            filePath: string;
            data: {
                contracts: {
                    [x: string]: {
                        [x: string]: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        address?: string;
                        constructorCode?: string;
                        localBytecodeHash?: string;
                        deployedBytecodeHash?: string;
                        bodyBytecodeHash?: string;
                        types?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        storage?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                        warnings?: string | ConcealedArray<unknown> | {
                            [x: string]: string | ConcealedArray<unknown> | any;
                        };
                    };
                };
                solidityLibs: {
                    [x: string]: {
                        address: string;
                        constructorCode: string;
                        bodyBytecodeHash: string;
                        localBytecodeHash: string;
                        deployedBytecodeHash: string;
                    };
                };
                proxies: {
                    [x: string]: ConcealedArray<import("../models/files/NetworkFile").ProxyInterface>;
                };
                manifestVersion?: string;
                zosversion?: string;
                proxyAdmin: {
                    address?: string;
                };
                proxyFactory: {
                    address?: string;
                };
                app: {
                    address?: string;
                };
                package: {
                    address?: string;
                };
                provider: {
                    address?: string;
                };
                version: string;
                frozen: string;
                dependencies: {
                    [x: string]: {
                        name?: string;
                        package?: string;
                        version?: string;
                        customDeploy?: string;
                    };
                };
            };
            manifestVersion: string;
            version: string;
            contracts: {
                [x: string]: {
                    [x: string]: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    address?: string;
                    constructorCode?: string;
                    localBytecodeHash?: string;
                    deployedBytecodeHash?: string;
                    bodyBytecodeHash?: string;
                    types?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    storage?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                    warnings?: string | ConcealedArray<unknown> | {
                        [x: string]: string | ConcealedArray<unknown> | any;
                    };
                };
            };
            solidityLibs: {
                [x: string]: {
                    address: string;
                    constructorCode: string;
                    bodyBytecodeHash: string;
                    localBytecodeHash: string;
                    deployedBytecodeHash: string;
                };
            };
            frozen: string;
            proxyAdmin: {
                address?: string;
            };
            proxyFactory: {
                address?: string;
            };
            app: {
                address?: string;
            };
            provider: {
                address?: string;
            };
            package: {
                address?: string;
            };
            readonly proxyAdminAddress: string;
            readonly proxyFactoryAddress: string;
            readonly appAddress: string;
            readonly packageAddress: string;
            readonly providerAddress: string;
            readonly isPublished: string;
            readonly contractAliases: ConcealedArray<string>;
            addSolidityLib: {};
            unsetSolidityLib: {};
            setSolidityLib: {};
            solidityLib: {};
            getSolidityLibs: {};
            hasSolidityLib: {};
            solidityLibsMissing: {};
            getSolidityLibOrContract: {};
            hasSolidityLibOrContract: {};
            updateImplementation: {};
            readonly dependencies: {
                [x: string]: {
                    name?: string;
                    package?: string;
                    version?: string;
                    customDeploy?: string;
                };
            };
            readonly dependenciesNames: ConcealedArray<string>;
            getDependency: {};
            hasDependency: {};
            hasDependencies: {};
            getProxies: {};
            getProxy: {};
            contract: {};
            contractAliasesMissingFromPackage: {};
            isCurrentVersion: {};
            hasContract: {};
            hasContracts: {};
            hasProxies: {};
            hasMatchingVersion: {};
            dependenciesNamesMissingFromPackage: {};
            dependencyHasCustomDeploy: {};
            dependencySatisfiesVersionRequirement: {};
            dependencyHasMatchingCustomDeploy: {};
            hasSameBytecode: {};
            setDependency: {};
            unsetDependency: {};
            updateDependency: {};
            addContract: {};
            setContract: {};
            unsetContract: {};
            setProxies: {};
            addProxy: {};
            removeProxy: {};
            updateProxy: {};
            _indexOfProxy: {};
            _proxiesOf: {};
            write: {};
        };
        name: string;
    } | {
        evmVersion: string;
        solcVersion: string;
        optimizer: string;
        optimizerRuns: string;
        name: string;
        network?: string;
    }, userEnvironment: UserEnvironment): void;
};
export default _default;
declare type Concealed<T> = T extends (infer U)[] ? ConcealedArray<U> : T extends object ? {
    [P in keyof T]: Concealed<T[P]>;
} : string;
interface ConcealedArray<T> extends Array<Concealed<T>> {
}
