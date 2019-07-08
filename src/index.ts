import { binary } from './basic/binary';
import { boolean } from './basic/boolean';
import { currency } from './basic/currency';
import { date } from './basic/date';
import { functions } from './basic/functions';
import { generators } from './basic/generators';
import { locale } from './basic/locale';
import { lorem } from './basic/lorem';
import { modifiers } from './basic/modifiers';
import { number } from './basic/number';
import { random } from './basic/random';
import { text } from './basic/text';
import { web } from './basic/web';

export interface PhonyDataDefineObject {
    [key: string]: any;
}

export interface PhonyData {
    define(name: PhonyDataDefineObject): void;
    define(name: string, generator: any): void;
}

export class PhonyData implements PhonyData {
    constructor() {
        // Most other modules use these.
        random(this);
        number(this);
        generators(this);
        functions(this);
        modifiers(this);

        // These are now safe to load.
        binary(this);
        boolean(this);
        currency(this);
        date(this);
        lorem(this);
        text(this);
        web(this);

        // Should get overridden and needs lorem.
        locale(this);
    }

    define(name: PhonyDataDefineObject | string, generator?: any) {
        if (typeof name === 'object') {
            for (const key of Object.keys(name)) {
                this.define(key, name[key]);
            }
        } else if (Array.isArray(generator)) {
            this.define(name, () => generator[this.index(generator.length)]);
        } else if (typeof generator === 'function') {
            if (generator.length) {
                Object.defineProperty(this, name, {
                    configurable: true,
                    value: generator.bind(this)
                });
            } else {
                Object.defineProperty(this, name, {
                    configurable: true,
                    get: generator
                });
            }

            Object.defineProperty(this, '_' + name, {
                configurable: true,
                value: generator.bind(this)
            });
        } else {
            this.define(name, () => generator);
        }
    }
}
