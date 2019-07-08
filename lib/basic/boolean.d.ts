import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        boolean: boolean;
        _boolean: () => boolean;
    }
}
export declare function boolean(phonyData: PhonyData): void;
