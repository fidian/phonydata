import { define } from '..';

export interface PhonyDataAddNumber {
    index(items: number): number;
    _index(items: number): number;
    integer(min: number, max: number): number;
    _integer(min: number, max: number): number;
}

export function number() {
    define('index', function(items: number = 1) {
        return Math.floor(this.random * items);
    });
    define('integer', function(min: number, max: number) {
        return Math.floor(this.random * (max - min + 1)) + min;
    });
}
