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
const NetworkController_1 = __importDefault(require("../models/network/NetworkController"));
function verify(contractAlias, { network = 'mainnet', txParams = {}, networkFile, optimizer = false, optimizerRuns = 200, remote = 'etherchain', apiKey, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!contractAlias)
            throw Error('A contract alias must be specified');
        if (remote === 'etherscan' && !apiKey)
            throw Error('Etherscan API key not specified. To get one, follow this link: https://etherscan.io/myapikey');
        const controller = new NetworkController_1.default(network, txParams, networkFile);
        controller.checkLocalContractDeployed(contractAlias, true);
        yield controller.verifyAndPublishContract(contractAlias, optimizer, optimizerRuns, remote, apiKey);
    });
}
exports.default = verify;
//# sourceMappingURL=verify.js.map