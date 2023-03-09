import { PhonyDataGeneratorFunction } from '../datatypes/phony-data-generator-function';

export function randomGenerator<T = any>(
    values: T[]
): PhonyDataGeneratorFunction<T> {
    return function () {
        return values[this.index(values.length)];
    };
}
