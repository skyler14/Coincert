"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upgrades_1 = require("@openzeppelin/upgrades");
const GENERIC_ERROR_MESSAGE = 'There was an undefined error. Please execute the same command again in verbose mode if necessary.';
class ErrorHandler {
    constructor(error, { verbose }) {
        this.error = error;
        this.verbose = verbose;
    }
    call() {
        if (!this.verbose) {
            upgrades_1.Loggy.stopAll();
            const errorMessage = this.error.message || GENERIC_ERROR_MESSAGE;
            upgrades_1.Loggy.noSpin.error(__filename, 'call', 'error-message', errorMessage);
        }
        else {
            upgrades_1.Loggy.noSpin.error(__filename, 'call', 'error-message', this.error.stack);
        }
        if (this.error.cb)
            this.error.cb();
        process.exit(1);
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map