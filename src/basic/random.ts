import MersenneTwister from 'mersenne-twister';
import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        random: number;
        _random: () => number;
        seed: (seed: number) => void;
        _seed: (seed: number) => void;
    }
}

export function random(phonyData: PhonyData) {
    const generator = new MersenneTwister();

    phonyData.define('random', () => generator.random());
    phonyData.define('seed', (seed: number = 0) => generator.init_seed(seed));
}
