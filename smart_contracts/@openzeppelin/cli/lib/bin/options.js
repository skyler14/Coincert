"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const Session_1 = require("../models/network/Session");
commander_1.default.Command.prototype.withNetworkTimeoutOption = function () {
    return this.option('--timeout <timeout>', `timeout in seconds for each blockchain transaction (defaults to ${Session_1.DEFAULT_TX_TIMEOUT}s)`);
};
commander_1.default.Command.prototype.withNetworkOptions = function () {
    return this.option('-n, --network <network>', 'network to be used')
        .option('-f, --from <from>', 'specify transaction sender address')
        .withNetworkTimeoutOption();
};
commander_1.default.Command.prototype.withPushOptions = function () {
    return this.option('--push [network]', 'push all changes to the specified network')
        .option('-f, --from <from>', 'specify the transaction sender address for --push')
        .withSkipCompileOption()
        .withNetworkTimeoutOption();
};
commander_1.default.Command.prototype.withNonInteractiveOption = function () {
    return this.option('--no-interactive', 'force to run the command in non-interactive mode');
};
commander_1.default.Command.prototype.withSkipCompileOption = function () {
    return this.option('--skip-compile', 'skips contract compilation');
};
//# sourceMappingURL=options.js.map