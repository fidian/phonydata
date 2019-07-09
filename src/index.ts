import { binary, PhonyDataAddBinary } from './basic/binary';
import { boolean, PhonyDataAddBoolean } from './basic/boolean';
import { currency, PhonyDataAddCurrency } from './basic/currency';
import { date, PhonyDataAddDate } from './basic/date';
import { functions, PhonyDataAddFunctions } from './basic/functions';
import { generators, PhonyDataAddGenerators } from './basic/generators';
import { locale, PhonyDataAddLocale } from './basic/locale';
import { lorem, PhonyDataAddLorem } from './basic/lorem';
import { modifiers, PhonyDataAddModifiers } from './basic/modifiers';
import { number, PhonyDataAddNumber } from './basic/number';
import { random, PhonyDataAddRandom } from './basic/random';
import { text, PhonyDataAddText } from './basic/text';
import { web, PhonyDataAddWeb } from './basic/web';

export type PhonyDataGeneratorFunction = (
    this: PhonyData,
    ...args: any[]
) => any;

export type PhonyDataGenerator =
    | PhonyDataGeneratorFunction
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
        PhonyDataAddGenerators,
        PhonyDataAddLocale,
        PhonyDataAddLorem,
        PhonyDataAddModifiers,
        PhonyDataAddNumber,
        PhonyDataAddRandom,
        PhonyDataAddText,
        PhonyDataAddWeb {
    define(name: string, value: PhonyDataGenerator): void;
    defineObject(obj: PhonyDataDefineObject): void;
}

export class PhonyData implements PhonyData {
    define(name: string, value: PhonyDataGenerator): void {
        defineForObject(this, name, value);
    }

    defineObject(obj: PhonyDataDefineObject): void {
        for (const key of Object.keys(obj)) {
            defineForObject(this, key, obj[key]);
        }
    }
}

function defineMethod(
    target: object,
    name: string,
    value: PhonyDataGeneratorFunction
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

export function defineForObject(target: object, name: PhonyDataDefineObject): void;
export function defineForObject(
    target: object,
    name: string,
    value: PhonyDataGenerator
): void;
export function defineForObject(
    target: object,
    name: PhonyDataDefineObject | string,
    value?: PhonyDataGenerator
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

export function define(name: string, value: PhonyDataGenerator): void {
    defineForObject(PhonyData.prototype, name, value);
}

binary();
boolean();
currency();
date();
functions();
generators();
locale();
lorem();
modifiers();
number();
random();
text();
web();
