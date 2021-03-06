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
const verify_1 = __importDefault(require("../scripts/verify"));
const ConfigManager_1 = __importDefault(require("../models/config/ConfigManager"));
const prompt_1 = require("../prompts/prompt");
const ProjectFile_1 = __importDefault(require("../models/files/ProjectFile"));
const telemetry_1 = __importDefault(require("../telemetry"));
const name = 'verify';
const signature = `${name} [contract-alias]`;
const description = 'verify a contract with etherscan or etherchain. Provide a contract name.';
const register = program => program
    .command(signature, undefined, { noHelp: true })
    .description(description)
    .option('-n, --network [network]', 'network where to verify the contract')
    .option('-o, --optimizer', 'enables optimizer option')
    .option('--optimizer-runs [runs]', 'specify number of runs if optimizer enabled.')
    .option('--remote <remote>', 'specify remote endpoint to use for verification')
    .option('--api-key <key>', 'specify etherscan API key. To get one, go to: https://etherscan.io/myapikey')
    .withNonInteractiveOption()
    .action(action);
function action(contractName, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { optimizer, optimizerRuns, remote, apiKey, network: networkName, interactive } = options;
        const args = { contractName };
        const opts = {
            network: networkName,
            optimizer,
            optimizerRuns,
            remote,
            apiKey,
        };
        const config = new ProjectFile_1.default().compilerOptions;
        const defaults = {
            optimizer: config.optimizer && config.optimizer.enabled,
            optimizerRuns: config.optimizer && config.optimizer.runs,
        };
        const props = getCommandProps(optimizer);
        const prompted = yield prompt_1.promptIfNeeded({ args, opts, defaults, props }, interactive);
        const { network, txParams } = yield ConfigManager_1.default.initNetworkConfiguration(prompted);
        yield telemetry_1.default.report('verify', Object.assign(Object.assign({}, prompted), { network, txParams }), interactive);
        yield verify_1.default(prompted.contractName, Object.assign(Object.assign({}, prompted), { network, txParams }));
        if (!options.dontExitProcess && process.env.NODE_ENV !== 'test')
            process.exit(0);
    });
}
function getCommandProps(optimizerEnabled) {
    return Object.assign(Object.assign(Object.assign({}, prompt_1.contractsList('contractName', 'Pick a contract', 'list', 'added')), prompt_1.networksList('network', 'list')), { optimizer: {
            type: 'confirm',
            message: 'Was the optimizer enabled when you compiled your contracts?',
            default: false,
            when: ({ contractName }) => contractName,
        }, optimizerRuns: {
            type: 'input',
            message: 'Specify the optimizer runs',
            when: ({ optimizer, contractName }) => contractName && (optimizer || optimizerEnabled),
        }, remote: {
            type: 'list',
            message: 'Select an endpoint',
            choices: ['etherscan', 'etherchain'],
            default: 'etherscan',
            when: ({ contractName }) => contractName,
        }, apiKey: {
            type: 'input',
            message: 'Provide an etherscan API KEY',
            when: ({ remote, contractName }) => contractName && remote === 'etherscan',
        } });
}
exports.default = { name, signature, description, register, action };
//# sourceMappingURL=verify.js.map