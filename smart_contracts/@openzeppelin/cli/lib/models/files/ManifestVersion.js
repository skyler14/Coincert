"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_isnull_1 = __importDefault(require("lodash.isnull"));
const lodash_isundefined_1 = __importDefault(require("lodash.isundefined"));
const OPEN_ZEPPELIN = 'openzeppelin';
const CURRENT_MANIFEST_VERSION = ['2', '2'];
const [CURRENT_MAJOR_VERSION, CURRENT_MINOR_VERSION] = CURRENT_MANIFEST_VERSION;
exports.MANIFEST_VERSION = stringifyCurrentManifestVersion();
function checkVersion(version, where) {
    if (version === exports.MANIFEST_VERSION)
        return;
    else if (lodash_isundefined_1.default(version)) {
        throw Error(`Manifest version identifier not found in ${where}. This means the project was built with an older version of ${OPEN_ZEPPELIN} (1.x), and needs to be upgraded. Please refer to the documentation at https://docs.openzeppelin.com for more info.`);
    }
    else if (!isCurrentMajor(version) || (!isCurrentMinor(version) && !isUndefinedMinor(version))) {
        throw Error(`Unrecognized manifest version identifier ${version} found in ${where}. This means the project was built with an unknown version of ${OPEN_ZEPPELIN}. Please refer to the documentation at https://docs.openzeppelin.com/sdk for more info.`);
    }
}
exports.checkVersion = checkVersion;
function isMigratableManifestVersion(version) {
    return !lodash_isundefined_1.default(version) && !lodash_isnull_1.default(version) && !isCurrentVersion(version);
}
exports.isMigratableManifestVersion = isMigratableManifestVersion;
function stringifyCurrentManifestVersion() {
    return CURRENT_MANIFEST_VERSION.join('.');
}
function isCurrentVersion(version) {
    return isCurrentMinor(version) && isCurrentMajor(version);
}
function isCurrentMinor(version) {
    const [major, minor] = version.split('.');
    return minor === CURRENT_MINOR_VERSION;
}
function isUndefinedMinor(version) {
    const [major, minor] = version.split('.');
    return lodash_isundefined_1.default(minor);
}
function isCurrentMajor(version) {
    const [major, minor] = version.split('.');
    return major === CURRENT_MAJOR_VERSION;
}
//# sourceMappingURL=ManifestVersion.js.map