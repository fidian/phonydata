"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binary_1 = require("./basic/binary");
var boolean_1 = require("./basic/boolean");
var currency_1 = require("./basic/currency");
var date_1 = require("./basic/date");
var functions_1 = require("./basic/functions");
var generators_1 = require("./basic/generators");
var locale_1 = require("./basic/locale");
var lorem_1 = require("./basic/lorem");
var modifiers_1 = require("./basic/modifiers");
var number_1 = require("./basic/number");
var random_1 = require("./basic/random");
var text_1 = require("./basic/text");
var web_1 = require("./basic/web");
var PhonyData = /** @class */ (function () {
    function PhonyData() {
    }
    PhonyData.prototype.define = function (name, value) {
        defineForObject(this, name, value);
    };
    PhonyData.prototype.defineObject = function (obj) {
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            defineForObject(this, key, obj[key]);
        }
    };
    return PhonyData;
}());
exports.PhonyData = PhonyData;
function defineMethod(target, name, value) {
    if (value.length) {
        Object.defineProperty(target, name, {
            configurable: true,
            value: value
        });
    }
    else {
        Object.defineProperty(target, name, {
            configurable: true,
            get: value
        });
    }
    Object.defineProperty(target, '_' + name, {
        configurable: true,
        value: value
    });
}
function defineForObject(target, name, value) {
    if (typeof name === 'object') {
        for (var _i = 0, _a = Object.keys(name); _i < _a.length; _i++) {
            var key = _a[_i];
            defineForObject(target, key, name[key]);
        }
    }
    else if (Array.isArray(value)) {
        defineMethod(target, name, function () {
            return value[this.index(value.length)];
        });
    }
    else if (typeof value === 'function') {
        defineMethod(target, name, value);
    }
    else {
        defineMethod(target, name, function () { return value; });
    }
}
exports.defineForObject = defineForObject;
function defineObject(obj) {
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        defineForObject(PhonyData.prototype, key, obj[key]);
    }
}
exports.defineObject = defineObject;
function define(name, value) {
    defineForObject(PhonyData.prototype, name, value);
}
exports.define = define;
binary_1.binary();
boolean_1.boolean();
currency_1.currency();
date_1.date();
functions_1.functions();
generators_1.generators();
locale_1.locale();
lorem_1.lorem();
modifiers_1.modifiers();
number_1.number();
random_1.random();
text_1.text();
web_1.web();
