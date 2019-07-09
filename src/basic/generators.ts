import { PhonyData } from '..';

export interface PhonyDataAddGenerators {
    formatGenerator(formats: string[] | string): () => string;
    parseGenerator(formats: string[] | string): () => string;
    sequenceGenerator(values: any[]): () => any;
}

export function generators() {
    PhonyData.prototype.formatGenerator = function(formats: string[] | string) {
        if (Array.isArray(formats)) {
            return () => this.format(formats[this.index(formats.length)]);
        }

        return () => this.format(formats);
    };

    PhonyData.prototype.parseGenerator = function(formats: string[] | string) {
        if (Array.isArray(formats)) {
            return () => this.parse(formats[this.index(formats.length)]);
        }

        return () => this.parse(formats);
    };

    PhonyData.prototype.sequenceGenerator = (values: any[]) => {
        let index = 0;

        return () => {
            const value = values[index];
            index += 1;
            index %= values.length;

            return value;
        };
    };
}
