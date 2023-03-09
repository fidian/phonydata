import { define } from '..';

export interface PhonyDataAddModifiers {
    capitalize(str: string): string;
    _capitalize(str: string): string;
    capitalizeFirst(str: string): string;
    _capitalizeFirst(str: string): string;
    capitalizeTitle(str: string): string;
    _capitalizeTitle(str: string): string;
    toJson(thing: any): string;
    _toJson(thing: any): string;
    toString(thing: any): string;
    _toString(thing: any): string;
}

export function modifiers() {
    define('capitalize', (str: string) => str.toString().toUpperCase());
    define('capitalizeFirst', (str: string) => {
        const s = str.toString();

        return s.charAt(0).toUpperCase() + s.substring(1);
    });
    define('capitalizeTitle', (str: string) =>
        str.toString().replace(/(^|[^\w])\w/g, match => match.toUpperCase()));
    define('toJson', (thing: any) => JSON.stringify(thing));
    define('toString', (thing: any) => thing.toString());
}
