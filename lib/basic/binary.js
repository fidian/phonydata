"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binary(phonyData) {
    phonyData.define('byteValue', function () { return phonyData.index(256); });
    phonyData.define('byteHex', function () { return phonyData.hexLower + phonyData.hexLower; });
    phonyData.define('hexLower', '0123456789abcdef'.split(''));
    phonyData.define('hexUpper', '0123456789ABCDEF'.split(''));
    phonyData.define('uuid', function () {
        var variant = ['8', '9', 'A', 'B'][phonyData.index(4)];
        return (phonyData.format('xxxxxxxx-xxxx-4xxx-') +
            variant +
            phonyData.format('xx-xxxxxxxxxxxx'));
    });
}
exports.binary = binary;
