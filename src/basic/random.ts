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
    obj.define('seed', (seed?: number) => generator.init_seed(seed || 0));

    return obj;
}

export function random() {
    define('random', function () {
        init(this);

        return this._random();
    });
    define('seed', function (seed?: number) {
        init(this);

        return this._seed(seed || 0);
    });
}
