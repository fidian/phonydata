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

export type PhonyDataGeneratorFunction<T> = (
    this: PhonyData,
    ...args: any[]
) => T;

export type PhonyDataGeneratorValue =
    | PhonyDataGeneratorFunction<any>
    | any[]
    | string
    | number
    | null;

export interface PhonyDataDefineObject {
    [key: string]: any;
}

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
    define(name: string, value: PhonyDataGeneratorValue): void;
    defineObject(obj: PhonyDataDefineObject): void;
    formatGenerator(formats: string[]): PhonyDataGeneratorFunction<string>;
    parseGenerator(formats: string[]): PhonyDataGeneratorFunction<string>;
    sequenceGenerator(values: any[]): PhonyDataGeneratorFunction<any>;
}

export class PhonyData implements PhonyData {
    define(name: string, value: PhonyDataGeneratorValue): void {
        defineForObject(this, name, value);
    }

    defineObject(obj: PhonyDataDefineObject): void {
        for (const key of Object.keys(obj)) {
            defineForObject(this, key, obj[key]);
        }
    }

    formatGenerator = formatGenerator;
    parseGenerator = parseGenerator;
    sequenceGenerator = sequenceGenerator;
}

export function formatGenerator(formats: string[]): PhonyDataGeneratorFunction<string> {
    const length = formats.length;

    return function() {
        return this.format(formats[this.index(length)]);
    };
}

export function parseGenerator(formats: string[]): PhonyDataGeneratorFunction<string> {
    const length = formats.length;

    return function() {
        return this.parse(formats[this.index(length)]);
    };
}

export function sequenceGenerator(values: any[]): PhonyDataGeneratorFunction<any> {
    let index = 0;

    return () => {
        const value = values[index];
        index += 1;
        index %= values.length;

        return value;
    };
}

function defineMethod(
    target: PhonyData,
    name: string,
    value: PhonyDataGeneratorFunction<any>
) {
    if (value.length) {
        Object.defineProperty(target, name, {
            configurable: true,
            value: value
        });
    } else {
        Object.defineProperty(target, name, {
            configurable: true,
            get: value
        });
    }

    Object.defineProperty(target, '_' + name, {
        configurable: true,
        value: value
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
        defineMethod(target, name, function() {
            return value[this.index(value.length)];
        });
    } else if (typeof value === 'function') {
        defineMethod(target, name, value);
    } else {
        defineMethod(target, name, () => value);
    }
}

export function defineObject(obj: PhonyDataDefineObject) {
    for (const key of Object.keys(obj)) {
        defineForObject(PhonyData.prototype, key, obj[key]);
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
