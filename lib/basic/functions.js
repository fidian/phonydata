"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function functions() {
    __1.define('dateFormat', function (format, date) {
        if (!(date instanceof Date)) {
            date = this.date;
        }
        // Avoid using these characters because they are already used in ISO
        // 8601: W, T, Z
        return format
            .toString()
            .replace(/YYYY/, date.getUTCFullYear().toString())
            .replace(/MM/, ('0' + (date.getUTCMonth() + 1)).substr(-2))
            .replace(/DD/, ('0' + date.getUTCDate()).substr(-2))
            .replace(/hh/, ('0' + date.getUTCHours()).substr(-2))
            .replace(/mm/, ('0' + date.getUTCMinutes()).substr(-2))
            .replace(/ss/, ('0' + date.getUTCSeconds()).substr(-2));
    });
    __1.define('format', function (format) {
        var _this = this;
        return format
            .toString()
            .replace(/#/g, function () { return _this.digit; })
            .replace(/A/g, function () { return _this.letterUpper; })
            .replace(/a/g, function () { return _this.letterLower; })
            .replace(/X/g, function () { return _this.hexUpper; })
            .replace(/x/g, function () { return _this.hexLower; })
            .replace(/Z/g, function () { return _this.alphaNumericUpper; })
            .replace(/z/g, function () { return _this.alphaNumericLower; });
    });
    __1.define('parse', function (format) {
        var typedPhonyData = this;
        return format.toString().replace(/\{\{(.*?)\}\}/g, function (match, grab) {
            var elements = grab.replace(/\s*/g, '').split('|');
            return elements.reduce(function (acc, item) {
                try {
                    return typedPhonyData['_' + item](acc);
                }
                catch (e) {
                    return e.toString();
                }
            }, null);
        });
    });
}
exports.functions = functions;
