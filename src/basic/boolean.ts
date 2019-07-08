import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        boolean: boolean;
        _boolean: () => boolean;
    }
}

export function boolean(phonyData: PhonyData) {
    phonyData.define('boolean', () => phonyData.random < 0.5);
}
