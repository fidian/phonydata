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
        return format
            .toString()
            .replace(/#/g, this._digit)
            .replace(/A/g, this._letterUpper)
            .replace(/a/g, this._letterLower)
            .replace(/X/g, this._hexUpper)
            .replace(/x/g, this._hexLower)
            .replace(/Z/g, this._alphaNumericUpper)
            .replace(/z/g, this._alphaNumericLower);
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
