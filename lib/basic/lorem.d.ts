import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        loremSentence: string;
        _loremSentence: () => string;
        loremSentenceFragment: string;
        _loremSentenceFragment: () => string;
        loremTitle: string;
        _loremTitle: () => string;
        loremTitleWords: (num?: number) => string;
        _loremTitleWords: (num?: number) => string;
        loremWord: string;
        _loremWord: () => string;
        loremWords: (num?: number) => string;
        _loremWords: (num?: number) => string;
    }
}
export declare function lorem(phonyData: PhonyData): void;
