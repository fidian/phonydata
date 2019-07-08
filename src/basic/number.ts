import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        index(items: number): number;
        _index(items: number): number;
        integer(min: number, max: number): number;
        _integer(min: number, max: number): number;
    }
}

export function number(phonyData: PhonyData) {
    phonyData.define('index', (items: number = 1) =>
        Math.floor(phonyData.random * items)
    );
    phonyData.define(
        'integer',
        (min: number, max: number) =>
            Math.floor(phonyData.random * (max - min + 1)) + min
    );
}
