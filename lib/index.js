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
        // Most other modules use these.
        random_1.random(this);
        number_1.number(this);
        generators_1.generators(this);
        functions_1.functions(this);
        modifiers_1.modifiers(this);
        // These are now safe to load.
        binary_1.binary(this);
        boolean_1.boolean(this);
        currency_1.currency(this);
        date_1.date(this);
        lorem_1.lorem(this);
        text_1.text(this);
        web_1.web(this);
        // Should get overridden and needs lorem.
        locale_1.locale(this);
    }
    PhonyData.prototype.define = function (name, generator) {
        var _this = this;
        if (typeof name === 'object') {
            for (var _i = 0, _a = Object.keys(name); _i < _a.length; _i++) {
                var key = _a[_i];
                this.define(key, name[key]);
            }
        }
        else if (Array.isArray(generator)) {
            this.define(name, function () { return generator[_this.index(generator.length)]; });
        }
        else if (typeof generator === 'function') {
            if (generator.length) {
                Object.defineProperty(this, name, {
                    configurable: true,
                    value: generator.bind(this)
                });
            }
            else {
                Object.defineProperty(this, name, {
                    configurable: true,
                    get: generator
                });
            }
            Object.defineProperty(this, '_' + name, {
                configurable: true,
                value: generator.bind(this)
            });
        }
        else {
            this.define(name, function () { return generator; });
        }
    };
    return PhonyData;
}());
exports.PhonyData = PhonyData;
