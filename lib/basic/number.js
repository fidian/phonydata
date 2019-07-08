"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function number(phonyData) {
    phonyData.define('index', function (items) {
        if (items === void 0) { items = 1; }
        return Math.floor(phonyData.random * items);
    });
    phonyData.define('integer', function (min, max) {
        return Math.floor(phonyData.random * (max - min + 1)) + min;
    });
}
exports.number = number;
