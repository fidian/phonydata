"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
// Placeholders that should get overridden by locale-specific extensions.
function locale() {
    // Language/location specific
    __1.define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
    __1.define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
    __1.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    __1.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    __1.define('personName', function () {
        return this.givenName + ' ' + this.surname;
    });
    __1.define('sentence', function () {
        return this.loremSentence;
    });
    __1.define('sentencePunctuation', '..........?!'.split(''));
    __1.define('title', function () {
        return this.loremTitle;
    });
    __1.define('titleWords', function (num) {
        return this.loremTitleWords(num);
    });
    __1.define('word', function () {
        return this.loremWord;
    });
    __1.define('words', function (num) {
        return this.loremWords(num);
    });
    // Country specific
    __1.define('addressLine1', function () {
        return this.locality.addressLine1;
    });
    __1.define('buildingNumber', function () {
        return this.integer(1, 1000);
    });
    __1.define('city', function () {
        return this.locality.city;
    });
    __1.define('currencyValue', function () {
        return this.integer(0, 10000) / 100;
    });
    __1.define('givenName', function () {
        return this.random < 0.5 ? this.givenNameFemale : this.givenNameMale;
    });
    __1.define('givenNameFemale', function () {
        return this.loremTitleWords(1);
    });
    __1.define('givenNameMale', function () {
        return this.loremTitleWords(1);
    });
    __1.define('locality', function () {
        var state = this.loremTitleWords(1);
        var stateCode = (state + 'XXX').substr(0, 3).toUpperCase();
        return {
            addressLine1: this.buildingNumber + ' ' + this.streetName,
            city: this.loremTitleWords(1),
            stateOrProvince: state,
            stateOrProvinceCode: stateCode,
            postCode: this.format('ZZZ ZZZ')
        };
    });
    __1.define('phoneNumber', function () {
        return this.integer(2, 9).toString() + this.format('##-###-####');
    });
    __1.define('postCode', function () {
        return this.locality.postCode;
    });
    __1.define('stateOrProvince', function () {
        return this.locality.stateOrProvinceCode;
    });
    __1.define('stateOrProvinceCode', function () {
        return this.locality.stateOrProvinceCode;
    });
    __1.define('streetName', function () {
        return this.loremTitleWords(2);
    });
    __1.define('surname', function () {
        return this.loremTitleWords(1);
    });
}
exports.locale = locale;
