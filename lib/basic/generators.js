"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function generators() {
    __1.PhonyData.prototype.formatGenerator = function (formats) {
        var _this = this;
        if (Array.isArray(formats)) {
            return function () { return _this.format(formats[_this.index(formats.length)]); };
        }
        return function () { return _this.format(formats); };
    };
    __1.PhonyData.prototype.parseGenerator = function (formats) {
        var _this = this;
        if (Array.isArray(formats)) {
            return function () { return _this.parse(formats[_this.index(formats.length)]); };
        }
        return function () { return _this.parse(formats); };
    };
    __1.PhonyData.prototype.sequenceGenerator = function (values) {
        var index = 0;
        return function () {
            var value = values[index];
            index += 1;
            index %= values.length;
            return value;
        };
    };
}
exports.generators = generators;
