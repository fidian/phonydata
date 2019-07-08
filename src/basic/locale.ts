import { PhonyData } from '..';

export interface PhonyDataLocality {
    addressLine1: string;
    city: string;
    stateOrProvince: string;
    postCode: string;
}

declare module '..' {
    interface PhonyData {
        // Language specific
        addressLine1: string;
        _addressLine1: () => string;
        alphaNumericLower: string;
        _alphaNumericLower: () => string;
        alphaNumericUpper: string;
        _alphaNumericUpper: () => string;
        buildingNumber: number;
        _buildingNumber: () => number;
        city: string;
        _city: () => string;
        givenName: string;
        _givenName: () => string;
        givenNameFemale: string;
        _givenNameFemale: () => string;
        givenNameMale: string;
        _givenNameMale: () => string;
        letterLower: string;
        _letterLower: () => string;
        letterUpper: string;
        _letterUpper: () => string;
        locality: PhonyDataLocality;
        _locality: PhonyDataLocality;
        phoneNumber: string;
        _phoneNumber: () => string;
        personName: string;
        _personName: () => string;
        postCode: string;
        _postCode: () => string;
        sentence: string;
        _sentence: () => string;
        sentencePunctuation: string;
        _sentencePunctuation: () => string;
        stateOrProvince: string;
        _stateOrProvince: () => string;
        streetName: string;
        _streetName: () => string;
        surname: string;
        _surname: () => string;
        title: string;
        _title: () => string;
        titleWords: (num?: number) => string;
        _titleWords: (num?: number) => string;
        word: string;
        _word: () => string;
        words: (num?: number) => string;
        _words: (num?: number) => string;

        // Country specific
        currencyValue: number;
        _currencyValue: () => number;
    }
}

// Placeholders that should get overridden by locale-specific extensions.
export function locale(phonyData: PhonyData) {
    // Language/location specific
    phonyData.define(
        'alphaNumericLower',
        'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
    );
    phonyData.define(
        'alphaNumericUpper',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
    );
    phonyData.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    phonyData.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    phonyData.define(
        'personName',
        () => phonyData.givenName + ' ' + phonyData.surname
    );
    phonyData.define('sentence', () => phonyData.loremSentence);
    phonyData.define('sentencePunctuation', '..........?!'.split(''));
    phonyData.define('title', () => phonyData.loremTitle);
    phonyData.define('titleWords', (num?: number) =>
        phonyData.loremTitleWords(num)
    );
    phonyData.define('word', () => phonyData.loremWord);
    phonyData.define('words', (num?: number) => phonyData.loremWords(num));

    // Country specific
    phonyData.define('addressLine1', () => phonyData.buildingNumber + ' ' + phonyData.streetName);
    phonyData.define('buildingNumber', () => phonyData.integer(1, 1000));
    phonyData.define('city', () => phonyData.loremTitleWords(1));
    phonyData.define('currencyValue', () => phonyData.integer(0, 10000) / 100);
    phonyData.define('givenName', () =>
        phonyData.random < 0.5
            ? phonyData.givenNameFemale
            : phonyData.givenNameMale
    );
    phonyData.define('givenNameFemale', () => phonyData.loremTitleWords(1));
    phonyData.define('givenNameMale', () => phonyData.loremTitleWords(1));
    phonyData.define('locality', () => {
        return {
            addressLine1: phonyData.addressLine1,
            city: phonyData.city,
            stateOrProvince: phonyData.stateOrProvince,
            postCode: phonyData.postCode
        };
    });
    phonyData.define(
        'phoneNumber',
        () =>
            phonyData.integer(2, 9).toString() + phonyData.format('##-###-####')
    );
    phonyData.define('postCode', () => phonyData.format('ZZZ ZZZ'));
    phonyData.define('stateOrProvince', () => phonyData.format('AAA'));
    phonyData.define('streetName', () => phonyData.loremTitleWords(2));
    phonyData.define('surname', () => phonyData.loremTitleWords(1));
}
