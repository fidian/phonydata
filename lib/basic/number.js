"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function number() {
    __1.define('index', function (items) {
        if (items === void 0) { items = 1; }
        return Math.floor(this.random * items);
    });
    __1.define('integer', function (min, max) {
        return Math.floor(this.random * (max - min + 1)) + min;
    });
}
exports.number = number;
