import { PhonyDataGeneratorFunction } from '../datatypes/phony-data-generator-function';

export function sequenceGenerator<T = any>(
    values: T[]
): PhonyDataGeneratorFunction<T> {
    let index = 0;

    return () => {
        const value = values[index];
        index += 1;
        index %= values.length;

        return value;
    };
}
