"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modifiers(phonyData) {
    phonyData.capitalize = function (str) { return str.toString().toUpperCase(); };
    phonyData.capitalizeFirst = function (str) {
        var s = str.toString();
        return s.charAt(0).toUpperCase() + s.substr(1);
    };
    phonyData.capitalizeTitle = function (str) { return str.toString().replace(/(^|[^\w])\w/g, function (match) { return match.toUpperCase(); }); };
    phonyData.toJson = function (thing) { return JSON.stringify(thing); };
    phonyData.toString = function (thing) { return thing.toString(); };
}
exports.modifiers = modifiers;
