"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const lodash_pick_1 = __importDefault(require("lodash.pick"));
const lodash_omit_1 = __importDefault(require("lodash.omit"));
const lodash_isundefined_1 = __importDefault(require("lodash.isundefined"));
const upgrades_1 = require("@openzeppelin/upgrades");
const NetworkConfig = {
    name: 'NetworkConfig',
    initialize(root = process.cwd()) {
        this.createContractsDir(root);
        this.createNetworkConfigFile(root);
    },
    exists(root = process.cwd()) {
        return upgrades_1.FileSystem.exists(`${root}/networks.js`);
    },
    getConfig(root = process.cwd()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const zosConfigFile = require(`${root}/networks.js`);
        const compilers = zosConfigFile.compilers || this.getDefaultCompilersProperties();
        const buildDir = `${root}/build/contracts`;
        return Object.assign(Object.assign({}, zosConfigFile), { compilers, buildDir });
    },
    getBuildDir() {
        return `${process.cwd()}/build/contracts`;
    },
    loadNetworkConfig(networkName, root = process.cwd()) {
        const config = this.getConfig(root);
        const { networks } = config;
        if (!networks[networkName])
            throw Error(`Given network '${networkName}' is not defined in your networks.js file`);
        const network = networks[networkName];
        if (lodash_isundefined_1.default(network.networkId)) {
            network.networkId = network.network_id;
        }
        const provider = this.getProvider(networks[networkName]);
        const artifactDefaults = this.getArtifactDefaults(config, networks[networkName]);
        return Object.assign(Object.assign({}, config), { network,
            provider,
            artifactDefaults });
    },
    getProvider(network) {
        let { provider } = network;
        if (!provider) {
            const { host, port, protocol } = network;
            if (!host)
                throw Error('A host name must be specified');
            if (!port)
                throw Error('A port must be specified');
            provider = `${protocol ? protocol : 'http'}://${host}:${port}`;
        }
        else if (typeof provider === 'function') {
            provider = provider();
        }
        return provider;
    },
    getArtifactDefaults(zosConfigFile, network) {
        const defaults = ['gas', 'gasPrice', 'from'];
        const configDefaults = lodash_omit_1.default(lodash_pick_1.default(zosConfigFile, defaults), lodash_isundefined_1.default);
        const networkDefaults = lodash_omit_1.default(lodash_pick_1.default(network, defaults), lodash_isundefined_1.default);
        return Object.assign(Object.assign({}, configDefaults), networkDefaults);
    },
    getDefaultCompilersProperties() {
        return {
            vyper: {},
            solc: {
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200,
                    },
                },
            },
        };
    },
    createContractsDir(root) {
        const contractsDir = `${root}/contracts`;
        this.createDir(contractsDir);
    },
    createNetworkConfigFile(root) {
        if (!this.exists(root)) {
            const blueprint = path_1.default.resolve(__dirname, './blueprint.networks.js');
            upgrades_1.FileSystem.copy(blueprint, `${root}/networks.js`);
        }
    },
    createDir(dir) {
        if (!upgrades_1.FileSystem.exists(dir)) {
            upgrades_1.FileSystem.createDir(dir);
            upgrades_1.FileSystem.write(`${dir}/.gitkeep`, '');
        }
    },
};
exports.default = NetworkConfig;
//# sourceMappingURL=NetworkConfig.js.map