"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_omitby_1 = __importDefault(require("lodash.omitby"));
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const lodash_pick_1 = __importDefault(require("lodash.pick"));
const lodash_compact_1 = __importDefault(require("lodash.compact"));
const path_1 = __importDefault(require("path"));
const upgrades_1 = require("@openzeppelin/upgrades");
const constants_1 = require("../files/constants");
const state = { alreadyPrintedSessionInfo: false };
const SESSION_FILE = '.session';
const SESSION_PATH = path_1.default.join(constants_1.OPEN_ZEPPELIN_FOLDER, SESSION_FILE);
const DEFAULT_TX_TIMEOUT = 10 * 60; // 10 minutes
exports.DEFAULT_TX_TIMEOUT = DEFAULT_TX_TIMEOUT;
const DEFAULT_EXPIRATION_TIMEOUT = 15 * 60; // 15 minutes
const Session = {
    getOptions(overrides = {}, silent) {
        const session = this._parseSession();
        if (!session || this._hasExpired(session))
            return this._setDefaults(overrides);
        if (!silent && !state.alreadyPrintedSessionInfo) {
            state.alreadyPrintedSessionInfo = true;
            const fields = lodash_omitby_1.default(session, (v, key) => overrides[key] && overrides[key] !== v);
            upgrades_1.Loggy.noSpin(__filename, 'getOptions', `get-options`, `Using session with ${describe(fields)}`);
        }
        return Object.assign(Object.assign({}, session), overrides);
    },
    setDefaultNetworkIfNeeded(network) {
        const session = this._parseSession();
        if (!session || this._hasExpired(session))
            this.open({ network }, 0, false);
    },
    getNetwork() {
        const session = this._parseSession();
        const network = session ? session.network : undefined;
        return { network, expired: this._hasExpired(session) };
    },
    open({ network, from, timeout }, expires = DEFAULT_EXPIRATION_TIMEOUT, logInfo = true) {
        const expirationTimestamp = new Date(new Date().getTime() + expires * 1000);
        upgrades_1.FileSystem.writeJson(SESSION_PATH, {
            network,
            from,
            timeout,
            expires: expirationTimestamp,
        });
        if (logInfo) {
            upgrades_1.Loggy.noSpin(__filename, 'getOptions', `get-options`, `Using ${describe({ network, from, timeout })} by default.`);
        }
    },
    close() {
        if (upgrades_1.FileSystem.exists(SESSION_PATH))
            upgrades_1.FileSystem.remove(SESSION_PATH);
        upgrades_1.Loggy.noSpin(__filename, 'getOptions', `close-session`, 'Closed openzeppelin session');
    },
    ignoreFile() {
        const GIT_IGNORE = '.gitignore';
        if (upgrades_1.FileSystem.exists(GIT_IGNORE) &&
            upgrades_1.FileSystem
                .read(GIT_IGNORE)
                .toString()
                .indexOf(SESSION_PATH) < 0) {
            upgrades_1.FileSystem.append(GIT_IGNORE, `\n${SESSION_PATH}\n`);
        }
    },
    _parseSession() {
        const session = upgrades_1.FileSystem.parseJsonIfExists(SESSION_PATH);
        if (lodash_isempty_1.default(session))
            return undefined;
        const parsedSession = lodash_pick_1.default(session, 'network', 'timeout', 'from', 'expires');
        return this._setDefaults(parsedSession);
    },
    _setDefaults(session) {
        if (!session.timeout)
            session.timeout = DEFAULT_TX_TIMEOUT;
        return session;
    },
    _hasExpired(session) {
        return !!session && new Date(session.expires) <= new Date();
    },
};
function describe(session) {
    return (lodash_compact_1.default([
        session.network && `network ${session.network}`,
        session.from && `sender address ${session.from}`,
        session.timeout && `timeout ${session.timeout} seconds`,
    ]).join(', ') || 'no options');
}
exports.default = Session;
//# sourceMappingURL=Session.js.map