import { PhonyData } from '..';
import { loremWords } from '../data/lorem-words';

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

export function lorem(phonyData: PhonyData) {
    phonyData.define(
        'loremSentence',
        phonyData.parseGenerator([
            '{{loremSentenceFragment|capitalizeFirst}}{{sentencePunctuation}}',
            '{{loremSentenceFragment|capitalizeFirst}}, {{loremSentenceFragment}}{{sentencePunctuation}}'
        ])
    );
    phonyData.define(
        'loremSentenceFragment',
        phonyData.parseGenerator([
            '{{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}'
        ])
    );
    phonyData.define('loremTitle', () =>
        phonyData.capitalizeTitle(phonyData.loremWords())
    );
    phonyData.define('loremTitleWords', (num?: number) =>
        phonyData.capitalizeTitle(phonyData.loremWords(num))
    );
    phonyData.define('loremWord', loremWords);
    phonyData.define('loremWords', (num?: number) => {
        const desired = num || phonyData.integer(3, 8);
        const words = [];

        while (words.length < desired) {
            words.push(phonyData.loremWord);
        }

        return words.join(' ');
    });
}
