interface NetworkConfigInterface extends ConfigInterface {
    artifactDefaults: ArtifactDefaults;
    network: Network;
}
interface ConfigInterface {
    networks: {
        [network: string]: Network;
    };
    provider: Provider;
    buildDir: string;
    compilers?: CompilersInfo;
}
interface NetworkCamelCase<T> {
    networkId: T;
}
interface NetworkSnakeCase<T> {
    network_id: T;
}
declare type NetworkId<T> = NetworkCamelCase<T> | NetworkSnakeCase<T> | (NetworkCamelCase<T> & NetworkSnakeCase<T>);
declare type Network = {
    host: string;
    port: number | string;
    protocol?: string;
    from?: number | string;
    gas?: number | string;
    gasPrice?: number | string;
    provider?: string | (() => any);
} & NetworkId<string | number>;
interface ArtifactDefaults {
    from?: number | string;
    gas?: number | string;
    gasPrice?: number | string;
}
declare type Provider = string | ((any: any) => any);
declare type CompilersInfo = any;
declare const NetworkConfig: {
    name: string;
    initialize(root?: string): void;
    exists(root?: string): boolean;
    getConfig(root?: string): ConfigInterface;
    getBuildDir(): string;
    loadNetworkConfig(networkName: string, root?: string): NetworkConfigInterface;
    getProvider(network: Network): Provider;
    getArtifactDefaults(zosConfigFile: ConfigInterface, network: Network): ArtifactDefaults;
    getDefaultCompilersProperties(): any;
    createContractsDir(root: string): void;
    createNetworkConfigFile(root: string): void;
    createDir(dir: string): void;
};
export default NetworkConfig;
