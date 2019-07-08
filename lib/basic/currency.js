"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currencies_1 = require("../data/currencies");
function currency(phonyData) {
    phonyData.define('currency', currencies_1.currencies);
    phonyData.define('currencyCode', function () { return phonyData.currency.code; });
    phonyData.define('currencyDigitalCode', function () { return phonyData.currency.digitalCode; });
    phonyData.define('currencyName', function () { return phonyData.currency.name; });
    phonyData.define('currencySymbol', function () { return phonyData.currency.symbol; });
}
exports.currency = currency;
