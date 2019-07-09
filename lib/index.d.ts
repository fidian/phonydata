import { PhonyDataAddBinary } from './basic/binary';
import { PhonyDataAddBoolean } from './basic/boolean';
import { PhonyDataAddCurrency } from './basic/currency';
import { PhonyDataAddDate } from './basic/date';
import { PhonyDataAddFunctions } from './basic/functions';
import { PhonyDataAddGenerators } from './basic/generators';
import { PhonyDataAddLocale } from './basic/locale';
import { PhonyDataAddLorem } from './basic/lorem';
import { PhonyDataAddModifiers } from './basic/modifiers';
import { PhonyDataAddNumber } from './basic/number';
import { PhonyDataAddRandom } from './basic/random';
import { PhonyDataAddText } from './basic/text';
import { PhonyDataAddWeb } from './basic/web';
export declare type PhonyDataGeneratorFunction = (this: PhonyData, ...args: any[]) => any;
export declare type PhonyDataGenerator = PhonyDataGeneratorFunction | any[] | string | number | null;
export interface PhonyDataDefineObject {
    [key: string]: any;
}
export interface PhonyData extends PhonyDataAddBinary, PhonyDataAddBoolean, PhonyDataAddCurrency, PhonyDataAddDate, PhonyDataAddFunctions, PhonyDataAddGenerators, PhonyDataAddLocale, PhonyDataAddLorem, PhonyDataAddModifiers, PhonyDataAddNumber, PhonyDataAddRandom, PhonyDataAddText, PhonyDataAddWeb {
    define(name: string, value: PhonyDataGenerator): void;
    defineObject(obj: PhonyDataDefineObject): void;
}
export declare class PhonyData implements PhonyData {
}
export declare function defineForObject(target: object, name: PhonyDataDefineObject): void;
export declare function defineForObject(target: object, name: string, value: PhonyDataGenerator): void;
export declare function defineObject(obj: PhonyDataDefineObject): void;
export declare function define(name: string, value: PhonyDataGenerator): void;
