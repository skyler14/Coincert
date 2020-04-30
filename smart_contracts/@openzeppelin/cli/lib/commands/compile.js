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
const Compiler_1 = require("../models/compiler/Compiler");
const telemetry_1 = __importDefault(require("../telemetry"));
const name = 'compile';
const signature = `${name}`;
const description = `compiles all contracts in the current project`;
const register = program => program
    .command(signature, undefined, { noHelp: true })
    .description(description)
    .option('--solc-version [version]', 'version of the solc compiler to use (value is written to configuration file for future runs, defaults to most recent release that satisfies contract pragmas)')
    .option('--optimizer [on|off]', 'enables compiler optimizer (value is written to configuration file for future runs, defaults to off)')
    .option('--optimizer-runs [runs]', 'specify number of runs if optimizer enabled (value is written to configuration file for future runs, defaults to 200)')
    .option('--evm-version [evm]', `choose target evm version (value is written to configuration file for future runs, defaults depends on compiler: byzantium prior to 0.5.5, petersburg from 0.5.5)`)
    .withNonInteractiveOption()
    .action(action);
function action(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { evmVersion, solcVersion: version, optimizer, optimizerRuns } = options;
        // Handle optimizer option:
        //- on --optimizer or --optimizer=on, enable it
        //- on --optimizer=off disable it
        //- if no --optimizer is set, use default from project.json, or false
        //- on any other --optimizer value, throw
        let optimizerEnabled = undefined;
        if (typeof optimizer === 'string') {
            if (optimizer.toLowerCase() === 'on')
                optimizerEnabled = true;
            else if (optimizer.toLowerCase() === 'off')
                optimizerEnabled = false;
            else
                throw new Error(`Invalid value ${optimizer} for optimizer flag (valid values are 'on' or 'off')`);
        }
        else if (typeof optimizer === 'boolean') {
            optimizerEnabled = optimizer;
        }
        const compilerOptions = {
            manager: 'openzeppelin',
            evmVersion,
            version,
            optimizer: {
                enabled: optimizerEnabled,
                runs: optimizerRuns && parseInt(optimizerRuns),
            },
        };
        yield telemetry_1.default.report('compile', { evmVersion, solcVersion: version, optimizer, optimizerRuns }, options.interactive);
        yield Compiler_1.compile(compilerOptions);
    });
}
exports.default = { name, signature, description, register, action };
//# sourceMappingURL=compile.js.map