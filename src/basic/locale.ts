import { define } from '..';

export interface PhonyDataLocality {
    addressLine1: string;
    city: string;
    stateOrProvince: string;
    stateOrProvinceCode: string;
    postCode: string;
}

export interface PhonyDataAddLocale {
    // Language specific
    alphaNumericLower: string;
    _alphaNumericLower(): string;
    alphaNumericUpper: string;
    _alphaNumericUpper(): string;
    letterLower: string;
    _letterLower(): string;
    letterUpper: string;
    _letterUpper(): string;
    sentence: string;
    _sentence(): string;
    sentencePunctuation: string;
    _sentencePunctuation(): string;
    title: string;
    _title(): string;
    titleWords(num?: number): string;
    _titleWords(num?: number): string;
    word: string;
    _word(): string;
    words(num?: number): string;
    _words(num?: number): string;

    // Country specific
    addressLine1: string;
    _addressLine1(): string;
    buildingNumber: number;
    _buildingNumber(): number;
    city: string;
    _city(): string;
    currencyValue: number;
    _currencyValue(): number;
    givenName: string;
    _givenName(): string;
    givenNameFemale: string;
    _givenNameFemale(): string;
    givenNameMale: string;
    _givenNameMale(): string;
    locality: PhonyDataLocality;
    _locality(): PhonyDataLocality;
    phoneNumber: string;
    _phoneNumber(): string;
    personName: string;
    _personName(): string;
    postCode: string;
    _postCode(): string;
    stateOrProvince: string;
    _stateOrProvince(): string;
    stateOrProvinceCode: string;
    _stateOrProvinceCode(): string;
    streetName: string;
    _streetName(): string;
    surname: string;
    _surname(): string;
}

// Placeholders that should get overridden by locale-specific extensions.
export function locale() {
    // Language/location specific
    define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(
        ''
    ));
    define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
        ''
    ));
    define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    define('personName', function() {
        return this.givenName + ' ' + this.surname;
    });
    define('sentence', function() {
        return this.loremSentence;
    });
    define('sentencePunctuation', '..........?!'.split(''));
    define('title', function() {
        return this.loremTitle;
    });
    define('titleWords', function(num?: number) {
        return this.loremTitleWords(num);
    });
    define('word', function() {
        return this.loremWord;
    });
    define('words', function(num?: number) {
        return this.loremWords(num);
    });

    // Country specific
    define('addressLine1', function() {
        return this.locality.addressLine1;
    });
    define('buildingNumber', function() {
        return this.integer(1, 1000);
    });
    define('city', function() {
        return this.locality.city;
    });
    define('currencyValue', function() {
        return this.integer(0, 10000) / 100;
    });
    define('givenName', function() {
        return this.random < 0.5 ? this.givenNameFemale : this.givenNameMale;
    });
    define('givenNameFemale', function() {
        return this.loremTitleWords(1);
    });
    define('givenNameMale', function() {
        return this.loremTitleWords(1);
    });
    define('locality', function() {
        const state = this.loremTitleWords(1);
        const stateCode = (state + 'XXX').substr(0, 3).toUpperCase();

        return {
            addressLine1: this.buildingNumber + ' ' + this.streetName,
            city: this.loremTitleWords(1),
            stateOrProvince: state,
            stateOrProvinceCode: stateCode,
            postCode: this.format('ZZZ ZZZ')
        };
    });
    define('phoneNumber', function() {
        return this.integer(2, 9).toString() + this.format('##-###-####');
    });
    define('postCode', function() {
        return this.locality.postCode;
    });
    define('stateOrProvince', function() {
        return this.locality.stateOrProvinceCode;
    });
    define('stateOrProvinceCode', function() {
        return this.locality.stateOrProvinceCode;
    });
    define('streetName', function() {
        return this.loremTitleWords(2);
    });
    define('surname', function() {
        return this.loremTitleWords(1);
    });
}
