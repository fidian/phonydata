import { PhonyDataGeneratorFunction } from '../datatypes/phony-data-generator-function';

export function parseGenerator(
    formats: string[]
): PhonyDataGeneratorFunction<string> {
    const length = formats.length;

    return function() {
        return this.parse(formats[this.index(length)]);
    };
}
