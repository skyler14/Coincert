"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const upgrades_1 = require("@openzeppelin/upgrades");
const DOCS_HOME = 'https://docs.openzeppelin.com/sdk/2.5';
const DANGEROUS_OPERATIONS_LINK = `${DOCS_HOME}/writing-contracts#potentially-unsafe-operations`;
const AVOID_INITIAL_VALUES_LINK = `${DOCS_HOME}/writing-contracts#avoid-initial-values-in-field-declarations`;
const INITIALIZERS_LINK = `${DOCS_HOME}/writing-contracts#initializers`;
const STORAGE_CHECKS_LINK = `${DOCS_HOME}/writing-contracts#modifying-your-contracts`;
class ValidationLogger {
    constructor(contract, existingContractInfo) {
        this.contract = contract;
        this.existingContractInfo = existingContractInfo || {};
    }
    get contractName() {
        return this.contract.schema.contractName;
    }
    log(validations, buildArtifacts) {
        const { hasConstructor, hasSelfDestruct, hasDelegateCall, hasInitialValuesInDeclarations, uninitializedBaseContracts, storageDiff, storageUncheckedVars, } = validations;
        this.logHasConstructor(hasConstructor);
        this.logHasSelfDestruct(hasSelfDestruct);
        this.logHasDelegateCall(hasDelegateCall);
        this.logHasInitialValuesInDeclarations(hasInitialValuesInDeclarations);
        this.logUncheckedVars(storageUncheckedVars);
        this.logUninitializedBaseContracts(uninitializedBaseContracts);
        this.logStorageLayoutDiffs(storageDiff, upgrades_1.getStorageLayout(this.contract, buildArtifacts));
    }
    logHasSelfDestruct(hasSelfDestruct) {
        if (hasSelfDestruct) {
            upgrades_1.Loggy.noSpin.warn(__filename, 'logHasSelfDestruct', `validation-has-selfdestruct`, `- Contract ${this.contractName} or one of its ancestors has a potentially unsafe selfdestruct operation. See ${DANGEROUS_OPERATIONS_LINK}.`);
        }
    }
    logHasDelegateCall(hasDelegateCall) {
        if (hasDelegateCall) {
            upgrades_1.Loggy.noSpin.warn(__filename, 'logHasDelegateCall', `validation-has-delegatecall`, `- Contract ${this.contractName} or one of its ancestors has a potentially unsafe delegatecall operation. See ${DANGEROUS_OPERATIONS_LINK}.`);
        }
    }
    logHasInitialValuesInDeclarations(hasInitialValuesInDeclarations) {
        if (hasInitialValuesInDeclarations) {
            upgrades_1.Loggy.noSpin.warn(__filename, 'logHasInitialValuesInDeclarations', `validation-has-initial-values`, `- Contract ${this.contractName} or one of its ancestors sets an initial value in a field declaration. Consider moving all field initializations to an initializer function. See ${AVOID_INITIAL_VALUES_LINK}.`);
        }
    }
    logHasConstructor(hasConstructor) {
        if (hasConstructor) {
            upgrades_1.Loggy.noSpin.error(__filename, 'logHasConstructor', `validation-has-constructor`, `- Contract ${this.contractName} has an explicit constructor. Change it to an initializer function. See ${INITIALIZERS_LINK}.`);
        }
    }
    logUninitializedBaseContracts(uninitializedBaseContracts) {
        if (!lodash_isempty_1.default(uninitializedBaseContracts)) {
            upgrades_1.Loggy.noSpin.warn(__filename, 'logUninitializedBaseContracts', `validation-uinitialized-base-contracts`, `- Contract ${this.contractName} has base contracts ${uninitializedBaseContracts.join(', ')} which are initializable, but their initialize methods are not called from ${this.contractName}.initialize. See ${INITIALIZERS_LINK}.`);
        }
    }
    logUncheckedVars(vars) {
        if (lodash_isempty_1.default(vars))
            return;
        const varList = vars.map(({ label, contract }) => `${label} (${contract})`).join(', ');
        const variablesString = `Variable${vars.length === 1 ? '' : 's'}`;
        const containsString = `contain${vars.length === 1 ? 's' : ''}`;
        upgrades_1.Loggy.noSpin.warn(__filename, 'logUninitializedBaseContracts', `validation-unchecked-vars`, `- ${variablesString} ${varList} ${containsString} a struct or enum. These are not automatically checked for storage compatibility in the current version. See ${STORAGE_CHECKS_LINK} for more info.`);
    }
    logStorageLayoutDiffs(storageDiff, updatedStorageInfo) {
        if (lodash_isempty_1.default(storageDiff))
            return;
        const originalTypesInfo = this.existingContractInfo.types || {};
        storageDiff.forEach(({ updated, original, action }) => {
            const updatedSourceCode = updated && upgrades_1.FileSystem.exists(updated.path) && upgrades_1.FileSystem.read(updated.path);
            const updatedVarType = updated && updatedStorageInfo.types[updated.type];
            const updatedVarSource = updated && [updated.path, _srcToLineNumber(updated.path, updated.src)].join(':');
            const updatedVarDescription = updated &&
                (_tryGetSourceFragment(updatedSourceCode, updatedVarType.src) ||
                    [updatedVarType.label, updated.label].join(' '));
            const originalVarType = original && originalTypesInfo[original.type];
            const originalVarDescription = original && [originalVarType.label, original.label].join(' ');
            switch (action) {
                case 'insert':
                    upgrades_1.Loggy.noSpin.error(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- New variable '${updatedVarDescription}' was inserted in contract ${updated.contract} in ${updatedVarSource}. You should only add new variables at the end of your contract.`);
                    break;
                case 'delete':
                    upgrades_1.Loggy.noSpin.error(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- Variable '${originalVarDescription}' was removed from contract ${original.contract}. You should avoid deleting variables from your contracts.`);
                    break;
                case 'append':
                    upgrades_1.Loggy.noSpin(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- New variable '${updatedVarDescription}' was added in contract ${updated.contract} in ${updatedVarSource} at the end of the contract.`);
                    break;
                case 'pop':
                    upgrades_1.Loggy.noSpin.warn(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- Variable '${originalVarDescription}' was removed from the end of contract ${original.contract}. You should avoid deleting variables from your contracts.`);
                    break;
                case 'rename':
                    upgrades_1.Loggy.noSpin.warn(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- Variable '${originalVarDescription}' in contract ${original.contract} was renamed to ${updated.label} in ${updatedVarSource}.
              ${updated.label} will have the value of ${original.label} after upgrading.`);
                    break;
                case 'typechange':
                    upgrades_1.Loggy.noSpin.warn(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- Variable '${original.label}' in contract ${original.contract} was changed from ${originalVarType.label} to ${updatedVarType.label} in ${updatedVarSource}. Avoid changing types of existing variables.`);
                    break;
                case 'replace':
                    upgrades_1.Loggy.noSpin.warn(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- Variable '${originalVarDescription}' in contract ${original.contract} was replaced with '${updatedVarDescription}' in
            ${updatedVarSource}. Avoid changing existing variables.`);
                    break;
                default:
                    upgrades_1.Loggy.noSpin.error(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs`, `- Unexpected layout change: ${action}`);
            }
        });
        upgrades_1.Loggy.noSpin(__filename, 'logStorageLayoutDiffs', `storage-layout-diffs-reference`, `See ${STORAGE_CHECKS_LINK} for more info.`);
    }
}
exports.default = ValidationLogger;
// TS-TODO: This code looks weird and was provisionally ported like this.
function _srcToLineNumber(sourceCode, srcFragment) {
    if (!sourceCode || !srcFragment)
        return null;
    const [begin] = srcFragment.split(':', 1);
    return sourceCode.substr(0, begin).split('\n').length;
}
// TS-TODO: This code looks weird and was provisionally ported like this.
function _tryGetSourceFragment(sourceCode, src) {
    if (!src || !sourceCode)
        return null;
    const [begin, count] = src.split(':');
    return sourceCode.substr(begin, count);
}
//# sourceMappingURL=ValidationLogger.js.map