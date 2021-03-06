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
const ScriptError_1 = __importDefault(require("../models/errors/ScriptError"));
function setAdmin({ newAdmin, packageName, contractAlias, proxyAddress, network, txParams = {}, networkFile, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!contractAlias && !proxyAddress && packageName) {
            throw Error('The address or name of the contract to transfer upgradeability admin rights must be provided.');
        }
        if (!newAdmin) {
            throw Error('The address of the new admin must be provided.');
        }
        const controller = new NetworkController_1.default(network, txParams, networkFile);
        try {
            if (contractAlias || proxyAddress) {
                const proxies = yield controller.setProxiesAdmin(packageName, contractAlias, proxyAddress, newAdmin);
            }
            else {
                yield controller.setProxyAdminOwner(newAdmin);
            }
            controller.writeNetworkPackageIfNeeded();
        }
        catch (error) {
            const cb = () => controller.writeNetworkPackageIfNeeded();
            throw new ScriptError_1.default(error, cb);
        }
    });
}
exports.default = setAdmin;
//# sourceMappingURL=set-admin.js.map