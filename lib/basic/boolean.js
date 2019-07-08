"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function boolean(phonyData) {
    phonyData.define('boolean', function () { return phonyData.random < 0.5; });
}
exports.boolean = boolean;
