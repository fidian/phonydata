export interface PhonyData {
    [index: string]: any;
    define(name: string, generator?: ([any] & Function & any)): void;
    parseGenerator(formatsArray: string[]): Function;
    random: number;
    _random: number;
    seed(seed?: number): void;
    digit: string;
    _digit: string;
    hexLower: string;
    _hexLower: string;
    hexUpper: string;
    _hexUpper: string;
    loremSentence: string;
    _loremSentence: string;
    loremSentenceFragment: string;
    _loremSentenceFragment: string;
    loremTitle: string;
    _loremTitle: string;
    loremTitleWords(num?: number): string;
    _loremTitleWords(num?: number): string;
    loremWord: string;
    _loremWord: string;
    loremWords(num?: number): string;
    _loremWords(num?: number): string;
    sentencePunctuation: string;
    _sentencePunctuation: string;
    index(items: number): number;
    _index(items: number): number;
    integer(min: number, max: number): number;
    _integer(min: number, max: number): number;
    boolean: boolean;
    _boolean: boolean;
    capitalize(str: string): string;
    _capitalize(str: string): string;
    capitalizeFirst(str: string): string;
    _capitalizeFirst(str: string): string;
    capitalizeTitle(str: string): string;
    _capitalizeTitle(str: string): string;
    format(format: string): string;
    parse(format: string): string;
    alphaNumericLower: string;
    _alphaNumericLower: string;
    alphaNumericUpper: string;
    _alphaNumericUpper: string;
    currencyValue: number;
    _currencyValue: number;
    letterLower: string;
    _letterLower: string;
    letterUpper: string;
    _letterUpper: string;
    sentence: string;
    _sentence: string;
    title: string;
    _title: string;
    titleWords(num?: number): string;
    _titleWords(num?: number): string;
    word: string;
    _word: string;
    words(num?: number): string;
    _words(num?: number): string;
}
export interface PhonyDataCollection {
    [key: string]: any;
}
export declare class PhonyData implements PhonyData {
    constructor();
}
