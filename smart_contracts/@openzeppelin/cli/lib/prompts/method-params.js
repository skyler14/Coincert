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
const upgrades_1 = require("@openzeppelin/upgrades");
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const lodash_isundefined_1 = __importDefault(require("lodash.isundefined"));
const lodash_negate_1 = __importDefault(require("lodash.negate"));
const input_1 = require("../utils/input");
const prompt_1 = require("./prompt");
function promptForMethodParams(contractFullName, options, additionalOpts = {}, constant = upgrades_1.ContractMethodMutability.NotConstant) {
    return __awaiter(this, void 0, void 0, function* () {
        const { interactive } = options;
        let { methodName, methodArgs } = input_1.parseMethodParams(options, 'initialize');
        const opts = Object.assign(Object.assign({}, additionalOpts), { methodName });
        const methodProps = getCommandProps(contractFullName, methodName, methodArgs, constant, additionalOpts);
        // prompt for method name if not provided
        ({ methodName } = yield prompt_1.promptIfNeeded({ opts, props: methodProps }, interactive));
        const methodArgsKeys = prompt_1.argsList(contractFullName, methodName.selector, constant).reduce((accum, { name: current }) => (Object.assign(Object.assign({}, accum), { [current]: undefined })), {});
        // if there are no methodArgs defined, or the methodArgs array length provided is smaller than the
        // number of arguments in the function, prompt for remaining arguments
        if (!methodArgs || methodArgs.length < Object.keys(methodArgsKeys).length) {
            const methodArgsProps = getCommandProps(contractFullName, methodName.selector, methodArgs, constant);
            const promptedArgs = yield prompt_1.promptIfNeeded({ opts: methodArgsKeys, props: methodArgsProps }, interactive);
            methodArgs = [...methodArgs, ...Object.values(lodash_pickby_1.default(promptedArgs, lodash_negate_1.default(lodash_isundefined_1.default)))];
        }
        return { methodName: methodName.selector, methodArgs };
    });
}
exports.default = promptForMethodParams;
function getCommandProps(contractFullName, methodName, methodArgs, constant, additionalOpts = {}) {
    const methods = prompt_1.methodsList(contractFullName, constant);
    const args = prompt_1.argsList(contractFullName, methodName, constant).reduce((accum, arg, index) => {
        return Object.assign(Object.assign({}, accum), { [arg.name]: {
                message: arg.name ? `${arg.name} (${arg.type}):` : `(${arg.type}):`,
                type: 'input',
                when: () => !methodArgs || !methodArgs[index],
                validate: input => {
                    try {
                        input_1.parseArg(input, arg.type);
                        return true;
                    }
                    catch (err) {
                        return `${err.message}. Enter a valid ${arg.type} such as: ${getPlaceholder(arg.type)}.`;
                    }
                },
                normalize: input => input_1.parseArg(input, arg.type),
            } });
    }, {});
    return Object.assign({ askForMethodParams: {
            type: 'confirm',
            message: additionalOpts['askForMethodParamsMessage'],
            when: () => methods.length !== 0 && methodName !== 'initialize' && additionalOpts.hasOwnProperty('askForMethodParams'),
        }, methodName: {
            type: 'list',
            message: 'Select which function',
            choices: methods,
            when: ({ askForMethodParams }) => !additionalOpts.hasOwnProperty('askForMethodParams') ||
                (additionalOpts.hasOwnProperty('askForMethodParams') && askForMethodParams),
            normalize: input => {
                if (typeof input !== 'object') {
                    return { name: input, selector: input };
                }
                else
                    return input;
            },
        } }, args);
}
function getPlaceholder(type) {
    const ARRAY_TYPE_REGEX = /(.+)\[\d*\]$/; // matches array type identifiers like uint[] or byte[4]
    if (type.match(ARRAY_TYPE_REGEX)) {
        const arrayType = type.match(ARRAY_TYPE_REGEX)[1];
        const itemPlaceholder = getPlaceholder(arrayType);
        return `[${itemPlaceholder}, ${itemPlaceholder}]`;
    }
    else if (type.startsWith('uint') ||
        type.startsWith('int') ||
        type.startsWith('fixed') ||
        type.startsWith('ufixed')) {
        return '42';
    }
    else if (type === 'bool') {
        return 'true';
    }
    else if (type === 'bytes') {
        return '0xabcdef';
    }
    else if (type === 'address') {
        return '0x1df62f291b2e969fb0849d99d9ce41e2f137006e';
    }
    else if (type === 'string') {
        return 'Hello world';
    }
    else {
        return null;
    }
}
//# sourceMappingURL=method-params.js.map