import { PhonyDataGeneratorFunction } from '../datatypes/phony-data-generator-function';

/**
 * Create a weighted generator that will select one item from the list.
 *
 * Pass in weights and values as an array of arrays. Weights are relative
 * to each other, so you can use percentages or population counts or any
 * other numbering scheme.
 *
 * phony.weightedGenerator([
 *     [4, "about four times as much as the next"],
 *     [1, "about 1 time out of five"],
 *     [0.00000001, "almost never"]
 * ]);
 *
 * When the values are a function, that function is called instead of being
 * returned. This way you can set up formats or parsed values.
 *
 * phony.weightedGenerator([
 *     [3, phony.parseGenerator(["{{digit}}{{digit}}")]],
 *     [2, phony.formatGenerator(["###"])]
 * ]);
 */
export function weightedGenerator<T = any>(
    weightsAndValues: [number, T][]
): PhonyDataGeneratorFunction<T> {
    let total = 0;
    const reweighed: [number, T][] = [];

    for (const item of weightsAndValues) {
        total += item[0];
        reweighed.push([total, item[1]]);
    }

    // Force the last one to always match in case of bizarre rounding
    // errors or other floating point issues
    if (reweighed.length) {
        reweighed[reweighed.length - 1][0] = Number.POSITIVE_INFINITY;
    }

    return function () {
        const r = this.random * total;

        for (const item of reweighed) {
            if (r < item[0]) {
                if (typeof item[1] === "function") {
                    return item[1]();
                }

                return item[1];
            }
        }

        return "";
    };
}

