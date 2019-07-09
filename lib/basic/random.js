"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mersenne_twister_1 = __importDefault(require("mersenne-twister"));
var __1 = require("..");
function init(obj) {
    var generator = new mersenne_twister_1.default();
    obj.define('random', function () { return generator.random(); });
    obj.define('seed', function (seed) {
        if (seed === void 0) { seed = 0; }
        return generator.init_seed(seed);
    });
    return obj;
}
function random() {
    __1.define('random', function () {
        return init(this).random;
    });
    __1.define('seed', function (seed) {
        if (seed === void 0) { seed = 0; }
        return init(this).seed(seed);
    });
}
exports.random = random;
