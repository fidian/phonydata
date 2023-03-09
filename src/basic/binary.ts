import { define } from '..';

export interface PhonyDataAddBinary {
    byteHex: string;
    _byteHex(): string;
    byteValue: number;
    _byteValue(): number;
    hexLower: string;
    _hexLower(): string;
    hexUpper: string;
    _hexUpper(): string;
    uuid: string;
    _uuid(): string;
}

export function binary() {
    define('byteHex', function () {
        return this.hexLower + this.hexLower;
    });
    define('byteValue', function () {
        return this.index(256);
    });
    define('hexLower', '0123456789abcdef'.split(''));
    define('hexUpper', '0123456789ABCDEF'.split(''));
    define('uuid', function () {
        return this.format('xxxxxxxx-xxxx-4xxx- xx-xxxxxxxxxxxx').replace(
            ' ',
            ['8', '9', 'A', 'B'][this.index(4)]
        );
    });
}
