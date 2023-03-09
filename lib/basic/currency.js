"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var currencies_1 = require("../data/currencies");
function currency() {
    __1.define('currency', currencies_1.currencies);
    __1.define('currencyCode', function () {
        return this.currency.code;
    });
    __1.define('currencyDigitalCode', function () {
        return this.currency.digitalCode;
    });
    __1.define('currencyName', function () {
        return this.currency.name;
    });
    __1.define('currencySymbol', function () {
        return this.currency.symbol;
    });
}
exports.currency = currency;
