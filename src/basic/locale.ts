import { PhonyData } from '..';

export interface PhonyDataLocality {
    city: string;
    stateOrProvince: string;
    postCode: string;
}

declare module '..' {
    interface PhonyData {
        // Language specific
        alphaNumericLower: string;
        _alphaNumericLower: () => string;
        alphaNumericUpper: string;
        _alphaNumericUpper: () => string;
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
    // Language specific
    phonyData.define(
        'alphaNumericLower',
        'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
    );
    phonyData.define(
        'alphaNumericUpper',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
    );
    phonyData.define('city', () => phonyData.loremTitleWords(1));
    phonyData.define('givenName', () =>
        phonyData.random < 0.5
            ? phonyData.givenNameFemale
            : phonyData.givenNameMale
    );
    phonyData.define('givenNameFemale', () => phonyData.loremTitleWords(1));
    phonyData.define('givenNameMale', () => phonyData.loremTitleWords(1));
    phonyData.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    phonyData.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    phonyData.define('locality', () => {
        return {
            city: phonyData.city,
            stateOrProvince: phonyData.stateOrProvince,
            postCode: phonyData.postCode
        };
    });
    phonyData.define(
        'personName',
        () => phonyData.givenName + ' ' + phonyData.surname
    );
    phonyData.define(
        'phoneNumber',
        () =>
            phonyData.integer(2, 9).toString() + phonyData.format('##-###-####')
    );
    phonyData.define('postCode', () => phonyData.format('ZZZ ZZZ'));
    phonyData.define('sentence', () => phonyData.loremSentence);
    phonyData.define('sentencePunctuation', '..........?!'.split(''));
    phonyData.define('stateOrProvince', () => phonyData.format('AAA'));
    phonyData.define('surname', () => phonyData.loremTitleWords(1));
    phonyData.define('title', () => phonyData.loremTitle);
    phonyData.define('titleWords', (num?: number) =>
        phonyData.loremTitleWords(num)
    );
    phonyData.define('word', () => phonyData.loremWord);
    phonyData.define('words', (num?: number) => phonyData.loremWords(num));

    // Country specific
    phonyData.define('currencyValue', () => phonyData.integer(0, 10000) / 100);
}
