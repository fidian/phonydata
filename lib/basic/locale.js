"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Placeholders that should get overridden by locale-specific extensions.
function locale(phonyData) {
    // Language/location specific
    phonyData.define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
    phonyData.define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
    phonyData.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    phonyData.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    phonyData.define('personName', function () { return phonyData.givenName + ' ' + phonyData.surname; });
    phonyData.define('sentence', function () { return phonyData.loremSentence; });
    phonyData.define('sentencePunctuation', '..........?!'.split(''));
    phonyData.define('title', function () { return phonyData.loremTitle; });
    phonyData.define('titleWords', function (num) {
        return phonyData.loremTitleWords(num);
    });
    phonyData.define('word', function () { return phonyData.loremWord; });
    phonyData.define('words', function (num) { return phonyData.loremWords(num); });
    // Country specific
    phonyData.define('addressLine1', function () { return phonyData.buildingNumber + ' ' + phonyData.streetName; });
    phonyData.define('buildingNumber', function () { return phonyData.integer(1, 1000); });
    phonyData.define('city', function () { return phonyData.loremTitleWords(1); });
    phonyData.define('currencyValue', function () { return phonyData.integer(0, 10000) / 100; });
    phonyData.define('givenName', function () {
        return phonyData.random < 0.5
            ? phonyData.givenNameFemale
            : phonyData.givenNameMale;
    });
    phonyData.define('givenNameFemale', function () { return phonyData.loremTitleWords(1); });
    phonyData.define('givenNameMale', function () { return phonyData.loremTitleWords(1); });
    phonyData.define('locality', function () {
        return {
            addressLine1: phonyData.addressLine1,
            city: phonyData.city,
            stateOrProvince: phonyData.stateOrProvince,
            postCode: phonyData.postCode
        };
    });
    phonyData.define('phoneNumber', function () {
        return phonyData.integer(2, 9).toString() + phonyData.format('##-###-####');
    });
    phonyData.define('postCode', function () { return phonyData.format('ZZZ ZZZ'); });
    phonyData.define('stateOrProvince', function () { return phonyData.format('AAA'); });
    phonyData.define('streetName', function () { return phonyData.loremTitleWords(2); });
    phonyData.define('surname', function () { return phonyData.loremTitleWords(1); });
}
exports.locale = locale;
