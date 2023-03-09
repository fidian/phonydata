import MersenneTwister from 'mersenne-twister';
import { define, PhonyData } from '..';

export interface PhonyDataAddRandom {
    random: number;
    _random(): number;
    seed(seed: number): void;
    _seed(seed: number): void;
}

function init(obj: PhonyData) {
    const generator = new MersenneTwister();

    obj.define('random', () => generator.random());
    obj.define('seed', (seed = 0) => generator.init_seed(seed));

    return obj;
}

export function random() {
    define('random', function () {
        return init(this).random;
    });
    define('seed', function (seed = 0) {
        return init(this).seed(seed);
    });
}
