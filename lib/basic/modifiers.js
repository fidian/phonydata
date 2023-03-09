"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function modifiers() {
    __1.define('capitalize', function (str) { return str.toString().toUpperCase(); });
    __1.define('capitalizeFirst', function (str) {
        var s = str.toString();
        return s.charAt(0).toUpperCase() + s.substr(1);
    });
    __1.define('capitalizeTitle', function (str) {
        return str.toString().replace(/(^|[^\w])\w/g, function (match) { return match.toUpperCase(); });
    });
    __1.define('toJson', function (thing) { return JSON.stringify(thing); });
    __1.define('toString', function (thing) { return thing.toString(); });
}
exports.modifiers = modifiers;
