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
export declare function modifiers(phonyData: PhonyData): void;
