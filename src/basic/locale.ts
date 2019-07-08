import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        // Language specific
        alphaNumericLower: string;
        _alphaNumericLower: () => string;
        alphaNumericUpper: string;
        _alphaNumericUpper: () => string;
        letterLower: string;
        _letterLower: () => string;
        letterUpper: string;
        _letterUpper: () => string;
        phoneNumber: string;
        _phoneNumber: () => string;
        sentence: string;
        _sentence: () => string;
        sentencePunctuation: string;
        _sentencePunctuation: () => string;
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
    phonyData.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    phonyData.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    phonyData.define(
        'phoneNumber',
        () =>
            phonyData.integer(2, 9).toString() + phonyData.format('##-###-####')
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
    phonyData.define('currencyValue', () => phonyData.integer(0, 10000) / 100);
}
