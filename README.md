PhonyData - Test Data Generator
===============================

This module provides a class that can be used to generate realistic looking test data. It's handier than trying to copy and paste or manually repeat data structures so that a UI can be vetted. The data can be fed into other systems, fake API calls can be made, then it can all happen again. The generator uses a random number generator that can be seeded, so the same data is created time after time.

[![npm version][npm-badge]][npm-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Dev Dependencies][devdependencies-badge]][devdependencies-link]


What It Does
------------

This creates random test data. It's able to produce booleans, numbers, strings, and even complex objects. Rules can select a random element from an array, use a format string, select from a list of different templated values or a custom function can be written. Data is retrieved using getters or function calls. The power is yours.

`PhonyData` uses some of the approach of [`casual`][casual] and data from [`faker`][faker]. Both of those projects are great, but have not been maintained in a while and pull requests are just sitting and waiting to be accepted.


Installation
------------

`npm` can do this for you.

    npm install --save-dev phonydata


Usage
-----

Import or require this in order to get the class.

    // Import version
    import { PhonyData } from "phonydata";

    // Require version
    const PhonyData = require("phonydata").PhonyData;

Next, create an instance.

    let phony = new PhonyData();

Finally, create data.

    console.log(phony.loremSentence);
    // Sint quos voluptas.
    console.log(phony.loremSentence);
    // Dolores et ratione atque, voluptas quia eos consectetur natus.
    console.log(phony.loremSentence);
    // Explicabo sed ut.

Since this is a class, you could extend it and add additional data generators. It isn't strictly necessary to extend the class to add your own generators. See the documentation for `phony.define()`.

    class PhonyExtended extends PhonyData {
        constructor() {
            super();
            this.define("sillyUnicodeCharacters", [ "☃", "☠", "〠", "⍨" ])
            this.define("complexObject", () => {
                return {
                    integer: this.integer(0, 9999),
                    letter: this.letter,
                    nestedObject: {
                        loremWord: this.loremWord,
                        word: this.word
                    }
                };
            });
        }
    }

    const phonyExtended = new PhonyExtended();
    console.log(phonyExtended.sillyUnicodeCharacters);
    // ☃
    console.log(phonyExtended.complexObject);
    // { integer: 1807,
    //   letter: undefined,
    //   nestedObject: { loremWord: 'exercitationem', word: 'deserunt' } }



API - Special Functions
-----------------------

There are a few special functions that are primarily used as the engine behind the random data generation.

### `phony.define(name, generator)`

Creates a new data generator and a new underscore function. The underscore function is described a bit where the data generators are listed.

    phony.define("biasedCoinFlip", () => phony.random > 0.8);

    console.log(phony.biasedCoinFlip);
    // true
    console.log(phony.biasedCoinFlip);
    // false
    console.log(phony.biasedCoinFlip);
    // false
    console.log(phony.biasedCoinFlip);
    // false


### `phony.define(name, arrayOfItems)`

Shortcut that will make a generator function that produces a random member of the array.

    phony.define("weather", [ "sunny", "rainy", "cloudy", "night" ]);

    console.log(phony.weather);
    // sunny

### `phony.parseGenerator(arrayOfParseStrings)`

Creates a generator function that should be passed into `phony.generator()`. The generator function will select a random string from the array and pass it through `phony.parse()`.

    phony.define("mood", phony.parseGenerator([ "happy", "sad", "bored" ]));
    phony.define("pronoun", phony.parseGenerator([ "he", "she", "it" ]));
    console.log(phony.mood);
    // bored
    console.log(phony.parse("{{pronoun}} is {{mood}}"));
    // it is sad
    phony.define("speech", phony.parseGenerator([
        "{{pronoun}} is {{mood}}",
        "{{pronoun}} is not {{mood}}",
        "{{mood}} {{pronoun}} is"
    ]));
    console.log(phony.speech);
    // sad it is


### `phony.seed(number?)`

Seeds the random number generator. When `number` is not passed, the generator is seeded with 0.

    phony.seed();
    console.log(phony.random);
    // 0.548813502304256
    console.log(phony.random);
    // 0.5928446163889021
    phony.seed(0);
    console.log(phony.random);
    // 0.548813502304256
    console.log(phony.random);
    // 0.5928446163889021


API - Data Getters
------------------

Each of these generators are able to be used in two different ways. First, you may use them as you would any other property. It just returns a different value each time. Secondly, you may add an underscore to the beginning, such as `_name` to access a function.

    // This shows the "random" getter.
    console.log(phony.random);
    // 0.42365479678846896

    // Calling the function version of this same generator.
    console.log(phony._random());
    // 0.6235636963974684

This is a complete list of getters. Ones tagged with `»` at the beginning indicate properties that are overridden when using a locale.

| Generator             | Description                                                    | Sample Shown As JSON                         |
|-----------------------|----------------------------------------------------------------|----------------------------------------------|
| alphaNumericLower     | `»` A lowercase letter or number.                              | "w"                                          |
| alphaNumericUpper     | `»` A capitalized letter or number.                            | "G"                                          |
| boolean               | Boolean.                                                       | true                                         |
| currencyValue         | `»` A number for a relatively inexpesive item, 0.00 to 100.99. | 20.69                                        |
| digit                 | Single numerical digit.                                        | "0"                                          |
| hexLower              | Hexadecimal digit in lowercase.                                | "f"                                          |
| hexUpper              | Hexadecimal digit in uppercase.                                | "c"                                          |
| letterLower           | `»` A lowercase letter.                                        | "l"                                          |
| letterUpper           | `»` A capitalized letter.                                      | "P"                                          |
| loremSentence         | Fake sentence.                                                 | "Et consequatur doloribus officiis officia." |
| loremSentenceFragment | Portion of a sentence.                                         | "sit voluptatem maxime quae"                 |
| loremTitle            | Three to eight capitalized words.                              | "Ut Quia Rerum Illum"                        |
| random                | Number from 0 to 1.                                            | 0.9053151633124799                           |
| sentence              | `»` Fake sentence.                                             | "Repellat quos neque animi."                 |
| sentencePunctuation   | A biased punctuation generator that produces mostly periods.   | "."                                          |
| title                 | `»` Three to eight capitalized words.                          | "Ad Voluptas Est Nihil"                      |
| word                  | `»` A word.                                                    | "quia"                                       |

`phony.random` returns a number from a range that starts at zero and ends just before one, also known as `[0-1)`. Use this as a basis for any random number generation because it can get reset when the user uses `phony.seed()`.


API - Data Functions
--------------------

The functions are very similar to getters, but they could take arguments, so you must always call them as a function.

    // "index" requires an argument, so it must always be called as a function.
    console.log(phony.index(10));
    // 6

    // This acts the exact same.
    console.log(phony._index(10));
    // 3

Some of these functions are useful as modifiers for `phony.parse()`, which is explained later. Anything with `»` at the beginning indicate properties that are overridden when using a locale.

| Generator            | Description                                    | Input                  | Sample Shown As JSON   |
|----------------------|------------------------------------------------|------------------------|------------------------|
| loremTitleWords(num) | A specific number of capitalized words.        | 2                      | "Beatae Unde"          |
| index(max)           | Number from 0 to `max - 1`.                    | 100                    | 33                     |
| integer(min, max)    | Number from `min` to `max`, inclusive.         | 99, 200                | 117                    |
| capitalize(str)      | Translates a string into uppercase.            | "test"                 | "TEST"                 |
| capitalizeFirst(str) | Translates the first character into uppercase. | "test"                 | "Test"                 |
| capitalizeTitle(str) | Capitalizes every word.                        | "one two"              | "One Two"              |
| format(format)       | Replaces letters in the format.                | "##-AA-aa-ZZ-zz-XX-xx" | "65-W1-qm-7Y-br-20-ec" |
| parse(format)        | Replaces `{{prop}}` and modifier syntax.       | "{{digit}}"            | "9"                    |
| titleWords(num)      | `»` A number of capitalized words.             | 2                      | "Ut Quis"              |
| toJson(thing)        | Converts `thing` to JSON.                      | "string"               | "\"string\""           |
| toString(thing)      | Returns `thing.toString()`                     | {}                     | "[Object]"             |
| words(num)           | `»` A number of words.                         | 2                      | "ut voluptatum"        |


### `phony.format()`

This replaces all occurrences of one character with another.

 * `#` -> `lorem.digit`
 * `A` -> `lorem.letterUpper`
 * `a` -> `lorem.letterLower`
 * `X` -> `lorem.hexUpper`
 * `x` -> `lorem.hexLower`
 * `Z` -> `lorem.alphaNumericUpper`
 * `z` -> `lorem.alphaNumericLower`

The letters and alphanumeric entries can be overridden when loading a locale.


### `phony.parse(format)`

Parses a string and looks for `{{prop}}` and replaces it with the value from `phony.prop`.

    console.log(phony.parse("{{letterUpper}}{{letterLower}}{{letterLower}} {{digit}}{{digit}}"));
    // Cbv 33

Modifier functions are supported, so you can change your strings.

    console.log(phony.parse("{{sentence}}"));
    // Iste laborum inventore mollitia quis?

    console.log(phony.parse("{{sentence|capitalize}}"));
    // EST NISI SED.

    console.log(phony.parse("{{sentence|capitalizeFirst}}"));
    // Voluptas odit minima suscipit reiciendis consequuntur.

    console.log(phony.parse("{{sentence|capitalizeTitle}}"));
    // Et Eos Sequi.

This can not use functions that take arguments, so you can not use a format like `{{integer(0,10)}}`. Also, there's nothing special about making a mistake about the formats, so do make sure you're using the right names and not using a function.

    console.log(phony.parse("{{wrong name}}"));
    // undefined

    console.log(phony.parse("{{integer}}"));
    // function () { [native code] }


Localization
------------

Support for localization is rudimentary at present. Generators will be updated to use more appropriate settings. To get a specially localized version of `PhonyData`, simply change your `require()` statement:

    require("phonydata/locale/en-US");  // Loads the US version of English

This will set the words to match the language and country-specific information to change in order to try to match the country.

| Locale  | Language | Country       |
|---------|----------|---------------|
| `en-US` | English  | United States |


Development
-----------

This module is licensed under the [MIT License][License] with an additional non-advertising clause.  See the [full license text][License] for information.


[casual]: https://github.com/boo1ean/casual
[dependencies-badge]: https://img.shields.io/david/fidian/phonydata.svg
[dependencies-link]: https://david-dm.org/fidian/phonydata
[devdependencies-badge]: https://img.shields.io/david/dev/fidian/phonydata.svg
[devdependencies-link]: https://david-dm.org/fidian/phonydata#info=devDependencies
[faker]: https://github.com/Marak/faker.js
[License]: LICENSE.md
[npm-badge]: https://img.shields.io/npm/v/metalsmith-data-loader.svg
[npm-link]: https://npmjs.org/package/metalsmith-data-loader
