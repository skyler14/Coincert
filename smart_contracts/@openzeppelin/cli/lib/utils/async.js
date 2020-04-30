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
const lodash_map_1 = __importDefault(require("lodash.map"));
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
function allPromisesOrError(promisesWithObjects, toErrorMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        const failures = [];
        const handlingFailure = (item) => __awaiter(this, void 0, void 0, function* () {
            let promise;
            let object = null;
            try {
                if (Array.isArray(item)) {
                    [promise, object] = item;
                }
                else {
                    promise = item;
                }
                return yield promise;
            }
            catch (error) {
                failures.push({ error, object });
                return null;
            }
        });
        const results = yield Promise.all(lodash_map_1.default(promisesWithObjects, handlingFailure));
        if (!lodash_isempty_1.default(failures)) {
            if (failures.length === 1)
                throw failures[0].error;
            const message = failures
                .map(({ error, object }) => (toErrorMessage ? toErrorMessage(error, object) : error.message || error))
                .join('\n');
            throw Error(message);
        }
        return results;
    });
}
exports.allPromisesOrError = allPromisesOrError;
//# sourceMappingURL=async.js.map