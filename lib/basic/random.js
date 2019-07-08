"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mersenne_twister_1 = __importDefault(require("mersenne-twister"));
function random(phonyData) {
    var generator = new mersenne_twister_1.default();
    phonyData.define('random', function () { return generator.random(); });
    phonyData.define('seed', function (seed) {
        if (seed === void 0) { seed = 0; }
        return generator.init_seed(seed);
    });
}
exports.random = random;
