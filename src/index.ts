import { PhonyDataDefineObject } from './datatypes/phony-data-define-object';
import { PhonyDataGeneratorFunction } from './datatypes/phony-data-generator-function';
import { PhonyDataGeneratorValue } from './datatypes/phony-data-generator-value';

import { formatGenerator } from './generator/format-generator';
import { parseGenerator } from './generator/parse-generator';
import { randomGenerator } from './generator/random-generator';
import { sequenceGenerator } from './generator/sequence-generator';
import { weightedGenerator } from './generator/weighted-generator';

import { binary, PhonyDataAddBinary } from './basic/binary';
import { boolean, PhonyDataAddBoolean } from './basic/boolean';
import { currency, PhonyDataAddCurrency } from './basic/currency';
import { date, PhonyDataAddDate } from './basic/date';
import { functions, PhonyDataAddFunctions } from './basic/functions';
import { locale, PhonyDataAddLocale } from './basic/locale';
import { lorem, PhonyDataAddLorem } from './basic/lorem';
import { modifiers, PhonyDataAddModifiers } from './basic/modifiers';
import { number, PhonyDataAddNumber } from './basic/number';
import { random, PhonyDataAddRandom } from './basic/random';
import { text, PhonyDataAddText } from './basic/text';
import { web, PhonyDataAddWeb } from './basic/web';

export interface PhonyData
    extends PhonyDataAddBinary,
        PhonyDataAddBoolean,
        PhonyDataAddCurrency,
        PhonyDataAddDate,
        PhonyDataAddFunctions,
        PhonyDataAddLocale,
        PhonyDataAddLorem,
        PhonyDataAddModifiers,
        PhonyDataAddNumber,
        PhonyDataAddRandom,
        PhonyDataAddText,
        PhonyDataAddWeb {
    _formatMap: Map<string, string>;
    define(name: string, value: PhonyDataGeneratorValue): void;
    define(obj: PhonyDataDefineObject): void;
    defineFormatter(formatCharacter: string, generatorName: string): void;
    formatGenerator: typeof formatGenerator;
    parseGenerator: typeof parseGenerator;
    randomGenerator: typeof randomGenerator;
    sequenceGenerator: typeof sequenceGenerator;
    weightedGenerator: typeof weightedGenerator;
}

export class PhonyData implements PhonyData {
    constructor() {
        this._formatMap = new Map([
            ['#', 'digit'],
            ['A', 'letterUpper'],
            ['a', 'letterLower'],
            ['X', 'hexUpper'],
            ['x', 'hexLower'],
            ['Z', 'alphaNumericUpper'],
            ['z', 'alphaNumericLower'],
        ]);
    }

    define(
        name: string | PhonyDataDefineObject,
        value?: PhonyDataGeneratorValue
    ): void {
        if (typeof name === 'string') {
            if (typeof value !== 'undefined') {
                defineForObject(this, name, value);
            }
        } else {
            for (const key of Object.keys(name)) {
                defineForObject(this, key, name[key]);
            }
        }
    }

    defineFormatter(formatCharacter: string, generatorName: string) {
        this._formatMap.set(formatCharacter, generatorName);
    }

    formatGenerator = formatGenerator;
    parseGenerator = parseGenerator;
    randomGenerator = randomGenerator;
    sequenceGenerator = sequenceGenerator;
    weightedGenerator = weightedGenerator;
}

function defineMethod(
    target: PhonyData,
    name: string,
    value: PhonyDataGeneratorFunction<any>
) {
    if (value.length) {
        Object.defineProperty(target, name, {
            configurable: true,
            value: value,
        });
    } else {
        Object.defineProperty(target, name, {
            configurable: true,
            get: value,
        });
    }

    Object.defineProperty(target, '_' + name, {
        configurable: true,
        value: value,
    });
}

export function defineForObject(
    target: PhonyData,
    name: string,
    value: PhonyDataGeneratorValue
): void {
    if (typeof name === 'object') {
        for (const key of Object.keys(name)) {
            defineForObject(target, key, name[key]);
        }
    } else if (Array.isArray(value)) {
        defineMethod(target, name, function () {
            return value[this.index(value.length)];
        });
    } else if (typeof value === 'function') {
        defineMethod(target, name, value);
    } else {
        defineMethod(target, name, () => value);
    }
}

export function define(name: string, value: PhonyDataGeneratorValue): void {
    defineForObject(PhonyData.prototype, name, value);
}

binary();
boolean();
currency();
date();
functions();
locale();
lorem();
modifiers();
number();
random();
text();
web();
