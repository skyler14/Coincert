import { TxParams } from '@openzeppelin/upgrades';
declare const ConfigManager: {
    config: any;
    initialize(root?: string): void;
    initStaticConfiguration(root?: string): void;
    initNetworkConfiguration(options?: any, silent?: boolean, root?: string): Promise<{
        network: string;
        txParams: TxParams;
    }>;
    getBuildDir(root?: string): string;
    getCompilerInfo(root?: string): {
        version?: string;
        optimizer?: boolean;
        optimizerRuns?: number;
    };
    getNetworkNamesFromConfig(root?: string): string[];
    setBaseConfig(root?: string): void;
};
export default ConfigManager;
