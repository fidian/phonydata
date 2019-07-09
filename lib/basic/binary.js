"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function binary() {
    __1.define('byteValue', function () {
        return this.index(256);
    });
    __1.define('byteHex', function () {
        return this.hexLower + this.hexLower;
    });
    __1.define('hexLower', '0123456789abcdef'.split(''));
    __1.define('hexUpper', '0123456789ABCDEF'.split(''));
    __1.define('uuid', function () {
        return this.format('xxxxxxxx-xxxx-4xxx- xx-xxxxxxxxxxxx').replace(' ', ['8', '9', 'A', 'B'][this.index(4)]);
    });
}
exports.binary = binary;
