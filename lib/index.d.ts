import { PhonyDataAddBinary } from './basic/binary';
import { PhonyDataAddBoolean } from './basic/boolean';
import { PhonyDataAddCurrency } from './basic/currency';
import { PhonyDataAddDate } from './basic/date';
import { PhonyDataAddFunctions } from './basic/functions';
import { PhonyDataAddLocale } from './basic/locale';
import { PhonyDataAddLorem } from './basic/lorem';
import { PhonyDataAddModifiers } from './basic/modifiers';
import { PhonyDataAddNumber } from './basic/number';
import { PhonyDataAddRandom } from './basic/random';
import { PhonyDataAddText } from './basic/text';
import { PhonyDataAddWeb } from './basic/web';
export declare type PhonyDataGeneratorFunction<T> = (this: PhonyData, ...args: any[]) => T;
export declare type PhonyDataGeneratorValue = PhonyDataGeneratorFunction<any> | any[] | string | number | null;
export interface PhonyDataDefineObject {
    [key: string]: any;
}
export interface PhonyData extends PhonyDataAddBinary, PhonyDataAddBoolean, PhonyDataAddCurrency, PhonyDataAddDate, PhonyDataAddFunctions, PhonyDataAddLocale, PhonyDataAddLorem, PhonyDataAddModifiers, PhonyDataAddNumber, PhonyDataAddRandom, PhonyDataAddText, PhonyDataAddWeb {
    define(name: string, value: PhonyDataGeneratorValue): void;
    defineObject(obj: PhonyDataDefineObject): void;
    formatGenerator(formats: string[]): PhonyDataGeneratorFunction<string>;
    parseGenerator(formats: string[]): PhonyDataGeneratorFunction<string>;
    sequenceGenerator(values: any[]): PhonyDataGeneratorFunction<any>;
}
export declare class PhonyData implements PhonyData {
    formatGenerator: (formats: string[]) => PhonyDataGeneratorFunction<string>;
    parseGenerator: (formats: string[]) => PhonyDataGeneratorFunction<string>;
    sequenceGenerator: (values: any[]) => PhonyDataGeneratorFunction<any>;
}
export declare function formatGenerator(formats: string[]): PhonyDataGeneratorFunction<string>;
export declare function parseGenerator(formats: string[]): PhonyDataGeneratorFunction<string>;
export declare function sequenceGenerator(values: any[]): PhonyDataGeneratorFunction<any>;
export declare function defineForObject(target: PhonyData, name: string, value: PhonyDataGeneratorValue): void;
export declare function defineObject(obj: PhonyDataDefineObject): void;
export declare function define(name: string, value: PhonyDataGeneratorValue): void;
