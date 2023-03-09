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


Upgrades
--------

Version 2 changed how generators are added. You can now add them to the prototype of the object, resulting in faster object creation. There's helpful functions exported, such as `defineForObject`, which will assist. Everything was rewritten in TypeScript as well in order to provide better type hints to others using the library. Previous code should still work.


Usage
-----

Import or require this in order to get the class.

    // Import version
    import { PhonyData } from "phonydata";

    // Require version
    const PhonyData = require("phonydata").PhonyData;

Next, create an instance.

    let instance = new PhonyData();

Finally, create data.

    console.log(instance.loremSentence);
    // Sint quos voluptas.
    console.log(instance.loremSentence);
    // Dolores et ratione atque, voluptas quia eos consectetur natus.
    console.log(instance.loremSentence);
    // Explicabo sed ut.

Since this is a class, you could extend it and add additional data generators. It isn't strictly necessary to extend the class to add your own generators. See the documentation for `instance.define()`.

    // Method 1: using instance.define()
    import { PhonyData } from "phonydata";
    const instance = new PhonyData.PhonyData();
    instance.define("sillyUnicodeCharacters", [ "☃", "☠", "〠", "⍨" ])
    instance.define("complexObject", () => {
        return {
            integer: instance.integer(0, 9999),
            letter: instance.alphaLower,
            nestedObject: {
                loremWord: instance.loremWord,
                word: instance.word
            }
        };
    });

    // Method 2: extending the class in the constructor
    import { PhonyData } from "phonydata";
    class PhonyExtended extends PhonyData {
        constructor() {
            super();
            this.define("sillyUnicodeCharacters", [ "☃", "☠", "〠", "⍨" ])
            this.define("complexObject", () => {
                return {
                    integer: this.integer(0, 9999),
                    letter: this.alphaLower,
                    nestedObject: {
                        loremWord: this.loremWord,
                        word: this.word
                    }
                };
            });
        }
    }
    const instance = new PhonyDataExtended();

    // Method 3: Typescript and using a helper to add to the prototype
    import { PhonyData, defineForObject } from "phonydata";
    class PhonyExtended extends PhonyData {}
    defineForObject(PhonyExtended.prototype, "sillyUnicodeCharacters",
        [ "☃", "☠", "〠", "⍨" ])
    defineForObject(PhonyExtended.prototype, "complexObject", () => {
        return {
            integer: this.integer(0, 9999),
            letter: this.alphaLower,
            nestedObject: {
                loremWord: this.loremWord,
                word: this.word
            }
        };
    });
    const instance = new PhonyDataExtended();


    // Finally, after picking one of the above methods, you can
    // start to generate random data.
    console.log(instance.sillyUnicodeCharacters);
    // ☃
    console.log(instance.complexObject);
    // { integer: 1807,
    //   letter: "w",
    //   nestedObject: { loremWord: 'exercitationem', word: 'deserunt' } }



API - Special Functions
-----------------------

There are a few special functions that are primarily used as the engine behind the random data generation.

**Random Numbers:** If you are defining your own generators, please leverage `this.random`, `this.index`, or other built-in methods because they all use the same random number source and that source can be seeded in order to produce the same values over multiple runs.

**Generator Functions:** You are welcome to use arrow functions or normal functions. When you use normal functions, you have access to `this`, so you can generate additional data. Arrow functions do not.

### `defineForObject(target, name, generator)`

Creates a new data generator and a new underscore function on an object. Typically, one would pass in a class's prototype as the target. The underscore function is described a bit where the data generators are listed.

    import { defineForObject, PhonyData } from 'phonydata';
    class ExtendedPhonyData extends PhonyData {}
    defineForObject(ExtendedPhonyData.prototype, 'biasedCoinFlip', function () {
        return this.random > 0.8;
    });
    const instance = new ExtendedPhonyData();

    console.log(instance.biasedCoinFlip);
    // true
    console.log(instance.biasedCoinFlip);
    // false
    console.log(instance.biasedCoinFlip);
    // false
    console.log(instance.biasedCoinFlip);
    // false


### `defineForObject(target, name, arrayOfItems)`

Shortcut that will make a generator function that produces a random member of the array because this is frequently used when making random data.

    import { defineForObject, PhonyData } from 'phonydata';
    class ExtendedPhonyData extends PhonyData {}
    defineForObject(ExtendedPhonyData.prototype, 'biasedCoinFlip',
        [ "sunny", "rainy", "cloudy", "night" ]);
    const instance = new ExtendedPhonyData();

    console.log(instance.weather);
    // sunny


### `defineForObject(target, hashOfGenerators)`

Adds multiple generators. Shorthand, convenience function that accepts generator functions or arrays of values as the property values.

    import { defineForObject, PhonyData } from 'phonydata';
    class ExtendedPhonyData extends PhonyData {}
    defineForObject(ExtendedPhonyData.prototype, {
        numberWord: [ "one", "two", "three", "four", "five" ],
        numberWordBigger: [ "twenty", "thirty", "forty" ]
    });
    const instance = new ExtendedPhonyData();

    console.log(instance.numberWord);
    // two

    console.log(instance.numberWordBigger);
    // forty


### `instance.define(name, generator)`

Creates a new data generator and a new underscore function. The underscore function is described a bit where the data generators are listed.

    instance.define("biasedCoinFlip", () => instance.random > 0.8);

    console.log(instance.biasedCoinFlip);
    // true
    console.log(instance.biasedCoinFlip);
    // false
    console.log(instance.biasedCoinFlip);
    // false
    console.log(instance.biasedCoinFlip);
    // false


### `instance.define(name, arrayOfItems)`

Shortcut that will make a generator function that produces a random member of the array.

    instance.define("weather", [ "sunny", "rainy", "cloudy", "night" ]);

    console.log(instance.weather);
    // sunny


### `instance.define(hashOfGenerators)`

Adds multiple generators. Shorthand, convenience function.

    instance.define({
        numberWord: [ "one", "two", "three", "four", "five" ],
        numberWordBigger: [ "twenty", "thirty", "forty" ]
    });

    console.log(instance.numberWord);
    // two

    console.log(instance.numberWordBigger);
    // forty


### `formatGenerator(arrayOfParseStrings)`

This function is exported from the library and is also available on instances.

    // Pick your favorite
    import { formatGenerator } from 'phonydata';
    const formatGenerator = require('phonydata').formatGenerator;
    instance.formatGenerator

Creates a generator function that should be passed into `instance.define()`. The generator function will select a random string from the array and pass it through `instance.parse()`.

    instance.define("someDigits", instance.formatGenerator([ "#", "##", "###" ]));
    console.log(instance.someDigits);
    // 553
    console.log(instance.someDigits);
    // 70


### `parseGenerator(arrayOfParseStrings)`

This function is exported from the library and is also available on instances.

    // Pick your favorite
    import { parseGenerator } from 'phonydata';
    const parseGenerator = require('phonydata').parseGenerator;
    instance.parseGenerator

Creates a generator function that should be passed into `instance.define()`. The generator function will select a random string from the array and pass it through `instance.parse()`.

    instance.define("mood", instance.parseGenerator([ "happy", "sad", "bored" ]));
    instance.define("pronoun", instance.parseGenerator([ "he", "she", "it" ]));
    console.log(instance.mood);
    // bored
    console.log(instance.parse("{{pronoun}} is {{mood}}"));
    // it is sad
    instance.define("speech", instance.parseGenerator([
        "{{pronoun}} is {{mood}}",
        "{{pronoun}} is not {{mood}}",
        "{{mood}} {{pronoun}} is"
    ]));
    console.log(instance.speech);
    // sad it is


### `randomGenerator(arrayOfValues)`

This function is exported from the library and is also available on instances.

    // Pick your favorite
    import { randomGenerator } from 'phonydata';
    const randomGenerator = require('phonydata').randomGenerator;
    instance.randomGenerator

Builds a generator function that will randomly select any of the values each time it is called. This is used internally when utilizing the shortcut of calling `instance.define` or `defineForObject` with an array of values.

    instance.define('direction', randomGenerator(['left', 'forward', 'right']));
    console.log(instance.direction);

    // This line is equivalent to the one above.
    instance.define('direction', ['left', 'forward', 'right']);


### `instance.seed(number?)`

Seeds the random number generator. When `number` is not passed, the generator is seeded with 0.

    instance.seed();
    console.log(instance.random);
    // 0.548813502304256
    console.log(instance.random);
    // 0.5928446163889021
    instance.seed(0);
    console.log(instance.random);
    // 0.548813502304256
    console.log(instance.random);
    // 0.5928446163889021


### `sequenceGenerator(arrayOfValues)`

This function is exported from the library and is also available on instances.

    // Pick your favorite
    import { sequenceGenerator } from 'phonydata';
    const sequenceGenerator = require('phonydata').sequenceGenerator;
    instance.sequenceGenerator

Returns a function that will provide the values in the array sequentially. When at the end, the list will begin again from the beginning.

    instance.define("powerLevel", instance.sequenceGenerator([ "low", "medium", "high" ]));
    console.log(instance.powerLevel);
    // low
    console.log(instance.powerLevel);
    // medium
    console.log(instance.powerLevel);
    // high
    console.log(instance.powerLevel);
    // low


### `weightedGenerator(weightsAndValues)`

This function is exported from the library and is also available on instances.

    // Pick your favorite
    import { weightedGenerator } from 'phonydata';
    const weightedGenerator = require('phonydata').weightedGenerator;
    instance.weightedGenerator

Returns a function that will provide the values in the array with a frequency that matches their weights. Weights are represented as numbers and you are able to use percentages, counts, or fractions to define them. All weights for all options are totaled together, so the weights are always relative to the other items in the array.

    // Define a generator that returns a city in New York. Each
    // city is weighted by its population so the generated data
    // looks like a random New York resident was chosen.
    instance.define("newYorkCityName", instance.weightedGenerator([
        [18972871, "New York"],  // Much more likely
        [2736074, "Brooklyn"],
        [2405464, "Queens"],
        // Insert many more cities here
        [27, "SALTAIRE"],
        [23, "WITHERBEE"],
        [14, "LINWOOD"]  // Extremely unlikely
    ]);

    console.log(instance.newYorkCityName);
    // North Amnityville

The associated values can be anything. When they are a function, that function is called to produce the value. Using this technique, you could generate a random 4-digit number most of the time and generate a UUID rarely.

    phony.define('customId', phony.weightedGenerator([
        [.9, phony.formatGenerator(['####'])], // 90% of the time
        [.1, () => phony.uuid] // 10% of the time
    ]);


API - Data Getters
------------------

Each of these generators are able to be used in two different ways. First, you may use them as you would any other property. It just returns a different value each time. Secondly, you may add an underscore to the beginning, such as `_name` to access a function.

    // This shows the "random" getter.
    console.log(instance.random);
    // 0.42365479678846896

    // Calling the function version of this same generator.
    console.log(instance._random());
    // 0.6235636963974684

This is a complete list of getters. Ones tagged with `»` at the beginning indicate properties that are overridden when using a locale.

| Generator             | Description                                                     | Sample Shown As JSON                         |
|-----------------------|-----------------------------------------------------------------|----------------------------------------------|
| addressLine1          | `»` The first line of an address.                               | "915 Quae Laboriosam"                        |
| buildingNumber        | `»` A number of a building as a number.                         | 404                                          |
| alphaNumericLower     | `»` A lowercase letter or number as a string.                   | "w"                                          |
| alphaNumericUpper     | `»` A capitalized letter or number as a string.                 | "G"                                          |
| boolean               | Boolean.                                                        | true                                         |
| byteHex               | A hexadecimal value of a single 8-bit byte.                     | "4b"                                         |
| byteValue             | A decimal value of a single 8-bit byte.                         | 75                                           |
| city                  | `»` Name of a city or town.                                     | "Blanditiis"                                 |
| cssBasicColorName     | A valid CSS3 color name.                                        | "olive"                                      |
| cssColorName          | An extended CSS3 color name. It's also capitalized.             | "SpringGreen"                                |
| currency              | An object that details a random type of currency.               | ***See note below.***                        |
| currencyCode          | Three-letter code for a currency.                               | "IQD"                                        |
| currencyDigitalCode   | Three-digit code for a currency.                                | "776"                                        |
| currencyName          | How the currency is said in conversation.                       | "Somali Shilling"                            |
| currencySymbol        | The symbol for a currency. Might be an empty string.            | "$"                                          |
| currencyValue         | `»` A number for a relatively inexpensive item, 0.00 to 100.99. | 20.69                                        |
| date                  | A date within one year of the current date.                     | new Date("2018-05-03T04:46:55.586Z")         |
| dateFuture            | A date in the future, within one year of the current date.      | new Date("2018-07-04T06:04:40.744Z")         |
| datePast              | A date in the past, within one year of the current date.        | new Date("2018-01-11T12:37:18.965Z")         |
| digit                 | Single numerical digit.                                         | "0"                                          |
| fileExtension         | Extension of a filename.                                        | "ogv"                                        |
| givenName             | `»` The first name of an individual.                            | "Dolor"                                      |
| givenNameFemale       | `»` The first name of a female.                                 | "Laborum"                                    |
| givenNameMale         | `»` The first name of a male.                                   | "Optio"                                      |
| hexLower              | Hexadecimal digit in lowercase.                                 | "f"                                          |
| hexUpper              | Hexadecimal digit in uppercase.                                 | "c"                                          |
| letterLower           | `»` A lowercase letter.                                         | "l"                                          |
| letterLower           | `»` A lowercase letter.                                         | "l"                                          |
| locality              | `»` A location as an object.                                    | ***See note below.***                        |
| loremSentence         | Fake sentence.                                                  | "Et consequatur doloribus officiis officia." |
| loremSentenceFragment | Portion of a sentence.                                          | "sit voluptatem maxime quae"                 |
| loremTitle            | Three to eight capitalized words.                               | "Ut Quia Rerum Illum"                        |
| loremWord             | A single word from Lorem Ipsum.                                 | "velit"                                      |
| mimeType              | A file's MIME type.                                             | "application/x-abiword"                      |
| phoneNumber           | `»` A phone number.                                             | "345-884-7216"                               |
| personName            | `»` The first and name of an individual.                        | "Tenetur Optio"                              |
| postCode              | `»` How mail gets routed. In the US it's called ZIP Code.       | "44P NX7"                                    |
| random                | Number from 0 to 1. ***See note below.***                       | 0.9053151633124799                           |
| rgbHex                | Color code, suitable for HTML.                                  | "#fafeca"                                    |
| sentence              | `»` Fake sentence.                                              | "Repellat quos neque animi."                 |
| sentencePunctuation   | A biased punctuation generator that produces mostly periods.    | "."                                          |
| stateOrProvince       | `»` Larger region than city, smaller than the nation.           | "AGV"                                        |
| title                 | `»` Three to eight capitalized words.                           | "Ad Voluptas Est Nihil"                      |
| uuid                  | Version 4 random UUID.                                          | "e92f7cc8-7eb7-4ec4-B36-1b7d8cc8d66c"        |
| word                  | `»` A word.                                                     | "quia"                                       |

`instance.currency` provides an object similar to this one.

    {
        code: 'TTD',
        symbol: '$',
        digitalCode: '780',
        name: 'Trinidad and Tobago Dollar',
        countries: [ 'Trinidad and Tobago' ]
    }

`instance.locality` provides an object similar to this one. When possible, the information within will relate to each other.

    {
        addressLine1: '54 Dolor Ut',
        city: 'Aliquid',
        stateOrProvince: 'Minima',
        stateOrProvinceCode: 'MIN',
        postCode: 'NZW 8AR'
    }

`instance.random` returns a number from a range that starts at zero and ends just before one, also known as `[0-1)`. Use this as a basis for any random number generation because it can get reset when the user uses `instance.seed()`.


API - Data Functions
--------------------

The functions are very similar to getters, but they could take arguments, so you must always call them as a function.

    // "index" requires an argument, so it must always be called as a function.
    console.log(instance.index(10));
    // 6

    // This acts the exact same.
    console.log(instance._index(10));
    // 3

Some of these functions are useful as modifiers for `instance.parse()`, which is explained later. Anything with `»` at the beginning indicate properties that are overridden when using a locale.

| Generator                | Description                                            | Input                  | Sample Shown As JSON        |
|--------------------------|--------------------------------------------------------|------------------------|-----------------------------|
| capitalize(str)          | Translates a string into uppercase.                    | "test"                 | "TEST"                      |
| capitalizeFirst(str)     | Translates the first character into uppercase.         | "test"                 | "Test"                      |
| capitalizeTitle(str)     | Capitalizes every word.                                | "one two"              | "One Two"                   |
| dateFormat(format, date) | Formats a date.                                        | "YYYY", new Date()     | "2018"                      |
| dateText(date)           | ISO8601, YYYY-MM-DD                                    | new Date()             | "2018-06-04"                |
| dateTimeCondensed(date)  | ISO8601, date and time without separators              | new Date()             | "20180604T142341Z"          |
| dateTimeOffset(date)     | ISO8601, date and time with a GMT offset               | new Date()             | "2018-06-04T14:23:41+00:00" |
| dateTimeMinuteZ(date)    | ISO8601, includes time and no seconds                  | new Date()             | "2018-06-04T14:23Z"         |
| dateTimeZ(date)          | ISO8601, includes time                                 | new Date()             | "2018-06-04T14:23:43Z"      |
| format(format)           | Replaces letters in the format.                        | "##-AA-aa-ZZ-zz-XX-xx" | "65-W1-qm-7Y-br-20-ec"      |
| index(items)             | Number from 0 to `items - 1`.                          | 100                    | 33                          |
| integer(min, max)        | Number that is between min and max, inclusive.         | 4, 5                   | 5                           |
| loremTitleWords(num)     | A number of Lorem Ipsum words, capitalized as a title. | 3                      | "Qui Est Hic"               |
| loremWords(num)          | A number of words of Lorem Ipsum.                      | 2                      | "dolor facere"              |
| parse(format)            | Replaces `{{prop}}` and modifier syntax.               | "{{digit}}"            | "9"                         |
| titleWords(num)          | `»` A number of capitalized words.                     | 2                      | "Ut Quis"                   |
| toJson(thing)            | Converts `thing` to JSON.                              | "string"               | "\"string\""                |
| toString(thing)          | Returns `thing.toString()`                             | {}                     | "[Object]"                  |
| words(num)               | `»` A number of words.                                 | 2                      | "ut voluptatum"             |


### `instance.dateFormat()`

Replaces series of letters with portions of a date. Makes it much easier to reformat dates into a readable text.

* `hh` -> Two digit hours.
* `DD` -> Two digit day of the month.
* `mm` -> Two digit minutes.
* `MM` -> Two digit month, 01 = January.
* `ss` -> Two digit seconds.
* `YYYY` -> Four digit year.


### `instance.format()`

This replaces all occurrences of one character with another.

 * `#` -> `lorem.digit`
 * `A` -> `lorem.letterUpper`
 * `a` -> `lorem.letterLower`
 * `X` -> `lorem.hexUpper`
 * `x` -> `lorem.hexLower`
 * `Z` -> `lorem.alphaNumericUpper`
 * `z` -> `lorem.alphaNumericLower`

The letters and alphanumeric entries can be overridden when loading a locale.


### `instance.parse(format)`

Parses a string and looks for `{{prop}}` and replaces it with the value from `instance[prop]`.

    console.log(instance.parse("{{letterUpper}}{{letterLower}}{{letterLower}} {{digit}}{{digit}}"));
    // Cbv 33

Modifier functions are supported, so you can change your strings.

    console.log(instance.parse("{{sentence}}"));
    // Iste laborum inventore mollitia quis?

    console.log(instance.parse("{{sentence|capitalize}}"));
    // EST NISI SED.

    console.log(instance.parse("{{sentence|capitalizeFirst}}"));
    // Voluptas odit minima suscipit reiciendis consequuntur.

    console.log(instance.parse("{{sentence|capitalizeTitle}}"));
    // Et Eos Sequi.

This can not use functions that take arguments, so you can not use a format like `{{integer(0,10)}}`. Also, there's nothing special about making a mistake about the formats, so do make sure you're using the right names and not using a function.

    console.log(instance.parse("{{wrong name}}"));
    // undefined

    console.log(instance.parse("{{integer}}"));
    // function () { [native code] }


Localization
------------

Support for localization is rudimentary at present. Generators will be updated to use more appropriate settings. To get a specially localized version of `PhonyData`, simply change your `require()` statement:

    require("phonydata/lib/locale/en-US").PhonyDataEnUs;  // Loads the US version of English

This will set the words, addresses, phone numbers, and other generators to match the language and country-specific information to change in order to try to match the country.

| Locale | Language | Country       |
|--------|----------|---------------|
| en-US  | English  | United States |


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
