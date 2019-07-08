import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
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
        currencyValue: number;
        _currencyValue: () => number;
    }
}
export declare function locale(phonyData: PhonyData): void;
