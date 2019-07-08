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

export function binary(phonyData: PhonyData) {
    phonyData.define('byteValue', () => phonyData.index(256));
    phonyData.define('byteHex', () => phonyData.hexLower + phonyData.hexLower);
    phonyData.define('hexLower', '0123456789abcdef'.split(''));
    phonyData.define('hexUpper', '0123456789ABCDEF'.split(''));
    phonyData.define('uuid', () => {
        const variant = ['8', '9', 'A', 'B'][phonyData.index(4)];

        return (
            phonyData.format('xxxxxxxx-xxxx-4xxx-') +
            variant +
            phonyData.format('xx-xxxxxxxxxxxx')
        );
    });
}
