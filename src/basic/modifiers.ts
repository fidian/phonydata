import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        capitalize: (str: string) => string;
        _capitalize: (str: string) => string;
        capitalizeFirst: (str: string) => string;
        _capitalizeFirst: (str: string) => string;
        capitalizeTitle: (str: string) => string;
        _capitalizeTitle: (str: string) => string;
        toJson: (thing: any) => string;
        _toJson: (thing: any) => string;
        toString: (thing: any) => string;
        _toString: (thing: any) => string;
    }
}

export function modifiers(phonyData: PhonyData) {
    phonyData.capitalize = (str: string) => str.toString().toUpperCase();
    phonyData.capitalizeFirst = (str: string) => {
        const s = str.toString();

        return s.charAt(0).toUpperCase() + s.substr(1);
    };
    phonyData.capitalizeTitle = (str: string) => str.toString().replace(/(^|[^\w])\w/g, match => match.toUpperCase());
    phonyData.toJson = (thing: any) => JSON.stringify(thing);
    phonyData.toString = (thing: any) => thing.toString();
}
