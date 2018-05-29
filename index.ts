import MersenneTwister from "mersenne-twister";
const loremWords: string[] = require("./data/lorem-words");

export interface PhonyData {
    // Index signatures
    [ index: string ]: any;

    // Class functions
    define(name: string, generator?: ([any] & Function & any)): void;
    parseGenerator(formatsArray: string[]): Function;

    // Random number generation functions
    random: number;
    _random: number;
    seed(seed?: number): void; // No underscore versio;

    // Generic test generation
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

    // Numeric values
    index(items: number): number;
    _index(items: number): number;
    integer(min: number, max: number): number;
    _integer(min: number, max: number): number;

    // Other values
    boolean: boolean;
    _boolean: boolean;

    // Modifiers
    capitalize(str: string): string;
    _capitalize(str: string): string;
    capitalizeFirst(str: string): string;
    _capitalizeFirst(str: string): string;
    capitalizeTitle(str: string): string;
    _capitalizeTitle(str: string): string;

    // Data generation
    format(format: string): string;
    parse(format: string): string;

    // Locale-specific placeholders
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
    [ key: string ]: any;
}

export class PhonyData implements PhonyData {
    constructor() {
        const generator = new MersenneTwister();

        /******
         * Random number generation functions
         ******/

        // [0,1)
        this.define('random', () => {
            return generator.random();
        });
        this.seed = (seed?: number) => {
            generator.init_seed(seed || 0);
        };

        /******
         * Generic text generation
         ******/
        this.define('digit', '0123456789'.split(''));
        this.define('hexLower', '0123456789abcdef'.split(''));
        this.define('hexUpper', '0123456789ABCDEF'.split(''));
        this.define('loremSentence', this.parseGenerator([
            '{{loremSentenceFragment|capitalizeFirst}}{{sentencePunctuation}}',
            '{{loremSentenceFragment|capitalizeFirst}}, {{loremSentenceFragment}}{{sentencePunctuation}}',
        ]));
        this.define('loremSentenceFragment', this.parseGenerator([
            '{{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
        ]));
        this.define('loremTitle', () => this.capitalizeTitle(this.loremWords(this.integer(3, 8))));
        this.define('loremTitleWords', (num?: number) => this.capitalizeTitle(this.loremWords(num)));
        this.define('loremWord', loremWords);
        this.define('loremWords', (num?: number) => {
            const desired = num || this.integer(3, 8);
            const words = [];

            while (words.length < desired) {
                words.push(this.loremWord);
            }

            return words.join(' ');
        });
        this.define('sentencePunctuation', '..........?!'.split(''));

        /******
         * Numeric values
         ******/
        this.define('index', (items: number) => Math.floor(this.random * (items || 1)));
        this.define('integer', (min: number, max: number) => Math.floor(this.random * (max - min + 1)) + min);

        /******
         * Other values
         ******/
        this.define('boolean', [ true, false ]);

        /******
         * Modifiers
         ******/
        this.define('capitalize', (str: string) => str.toString().toUpperCase());
        this.define('capitalizeFirst', (str: string) => str.toString().charAt(0).toUpperCase() + str.toString().substr(1));
        this.define('capitalizeTitle', (str: string) => str.toString().replace(/(^|[^\w])\w/g, (match) => match.toUpperCase()));

        /******
         * Data generation
         ******/
        this.define('format', (format: string) => format.toString()
            .replace(/#/g, this._digit)
            .replace(/A/g, this._letterUpper)
            .replace(/a/g, this._letterLower)
            .replace(/X/g, this._hexUpper)
            .replace(/x/g, this._hexLower)
            .replace(/Z/g, this._alphaNumericUpper)
            .replace(/z/g, this._alphaNumericLower));
        this.define('parse', (format: string) => format.toString()
            .replace(/\{\{(.*?)\}\}/g, (match: string, grab: string) => {
                const elements = grab.replace(/\s*/g, '').split('|');
                const val = this[elements.shift()!];

                return elements.reduce((acc: any, item: string) => {
                    return this[`_${item}`](acc);
                }, val);
            }));

        /******
         * Placeholders that should get overridden by locale-specific extensions.
         ******/
        this.define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
        this.define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
        this.define('currencyValue', () => this.integer(0, 100) + this.integer(0, 100) / 100);
        this.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
        this.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
        this.define('sentence', this._loremSentence);
        this.define('title', this._loremTitle);
        this.define('titleWords', this._loremTitleWords);
        this.define('word', this._loremWord);
        this.define('words', this._loremWords);
    }

    define(name: (string & PhonyDataCollection), generator?: ([any] & Function & any)): void {
        if (typeof name === 'object') {
            Object.keys(name).forEach((key: string) => {
                this.define(key, name[key]);
            });

            return;
        }

        if (Array.isArray(generator)) {
            return this.define(name, () => {
                return generator[this.index(generator.length)];
            });
        }

        if (typeof generator !== 'function') {
            return this.define(name, () => {
                return generator;
            });
        }

        if (generator.length) {
            this[name] = generator.bind(this);
        } else {
            Object.defineProperty(this, name, {
                configurable: true,
                get: generator,
            });
        }

        this[`_${name}`] = generator.bind(this);
    }

    parseGenerator(formatsArray: string[]): Function {
        return () => this.parse(formatsArray[this.index(formatsArray.length)]);
    }
}
