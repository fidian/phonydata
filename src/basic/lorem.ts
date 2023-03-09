import { define } from '..';
import { loremWords } from '../data/lorem-words';

export interface PhonyDataAddLorem {
    loremSentence: string;
    _loremSentence(): string;
    loremSentenceFragment: string;
    _loremSentenceFragment(): string;
    loremTitle: string;
    _loremTitle(): string;
    loremTitleWords(num?: number): string;
    _loremTitleWords(num?: number): string;
    loremWord: string;
    _loremWord(): string;
    loremWords(num?: number): string;
    _loremWords(num?: number): string;
}

export function lorem() {
    define('loremSentence', function () {
        if (this.boolean) {
            return (
                this.capitalizeFirst(this.loremSentenceFragment) +
                this.sentencePunctuation
            );
        }

        return (
            this.capitalizeFirst(this.loremSentenceFragment) +
            ', ' +
            this.loremSentenceFragment +
            this.sentencePunctuation
        );
    });
    define('loremSentenceFragment', function () {
        return this.loremWords(this.integer(3, 7));
    });
    define('loremTitle', function () {
        return this.capitalizeTitle(this.loremWords());
    });
    define('loremTitleWords', function (num?: number) {
        return this.capitalizeTitle(this.loremWords(num));
    });
    define('loremWord', loremWords);
    define('loremWords', function (num?: number) {
        const desired = num || this.integer(3, 8);
        const words = [];

        while (words.length < desired) {
            words.push(this.loremWord);
        }

        return words.join(' ');
    });
}
