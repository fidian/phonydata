"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function boolean() {
    __1.define('boolean', function () {
        return this.random < 0.5;
    });
}
exports.boolean = boolean;
