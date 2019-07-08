"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generators(phonyData) {
    phonyData.formatGenerator = function (formats) {
        if (Array.isArray(formats)) {
            return function () { return phonyData.format(formats[phonyData.index(formats.length)]); };
        }
        return function () { return phonyData.format(formats); };
    };
    phonyData.parseGenerator = function (formats) {
        if (Array.isArray(formats)) {
            return function () { return phonyData.parse(formats[phonyData.index(formats.length)]); };
        }
        return function () { return phonyData.parse(formats); };
    };
    phonyData.sequenceGenerator = function (values) {
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
