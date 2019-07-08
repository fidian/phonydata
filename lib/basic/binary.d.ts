import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        byteValue: number;
        _byteValue: () => number;
        byteHex: string;
        _byteHex: () => string;
        hexLower: string;
        _hexLower: () => string;
        hexUpper: string;
        _hexUpper: () => string;
        uuid: string;
        _uuid: () => string;
    }
}
export declare function binary(phonyData: PhonyData): void;
