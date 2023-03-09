import { PhonyDataGeneratorFunction } from '../datatypes/phony-data-generator-function';

export function formatGenerator(
    formats: string[]
): PhonyDataGeneratorFunction<string> {
    const length = formats.length;

    return function () {
        return this.format(formats[this.index(length)]);
    };
}
