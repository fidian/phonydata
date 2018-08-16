"use strict";

var currencies;

currencies = require("../data/currencies");

module.exports = {
    currency: currencies,
    currencyCode: function () {
        return this.currency.code;
    },
    currencyDigitalCode: function () {
        return this.currency.digitalCode;
    },
    currencyName: function () {
        return this.currency.name;
    },
    currencySymbol: function () {
        return this.currency.symbol;
    }
};
