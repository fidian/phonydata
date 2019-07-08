import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        random: number;
        _random: () => number;
        seed: (seed: number) => void;
        _seed: (seed: number) => void;
    }
}
export declare function random(phonyData: PhonyData): void;
