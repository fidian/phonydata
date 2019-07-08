import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        formatGenerator: (formats: string[] | string) => (() => string);
        parseGenerator: (formats: string[] | string) => (() => string);
        sequenceGenerator: (values: any[]) => (() => any);
    }
}

export function generators(phonyData: PhonyData) {
    phonyData.formatGenerator = (formats: string[] | string) => {
        if (Array.isArray(formats)) {
            return () => phonyData.format(formats[phonyData.index(formats.length)]);
        }

        return () => phonyData.format(formats);
    };

    phonyData.parseGenerator = (formats: string[] | string) => {
        if (Array.isArray(formats)) {
            return () => phonyData.parse(formats[phonyData.index(formats.length)]);
        }

        return () => phonyData.parse(formats);
    };

    phonyData.sequenceGenerator = (values: any[]) => {
        let index = 0;

        return () => {
            const value = values[index];
            index += 1;
            index %= values.length;

            return value;
        };
    };
}
