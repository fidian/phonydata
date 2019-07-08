import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        dateFormat: (format: string, date?: Date) => string;
        _dateFormat: (format: string, date?: Date) => string;
        format: (format: string) => string;
        _format: (format: string) => string;
        parse: (format: string) => string;
        _parse: (format: string) => string;
    }
}

interface TypedPhonyData {
    [key: string]: (...args: any[]) => any;
}

export function functions(phonyData: PhonyData) {
    phonyData.define('dateFormat', (format: string, date?: Date) => {
        if (!(date instanceof Date)) {
            date = phonyData.date;
        }

        // Avoid using these characters because they are already used in ISO
        // 8601: W, T, Z
        return format
            .toString()
            .replace(/YYYY/, date.getUTCFullYear().toString())
            .replace(/MM/, ('0' + (date.getUTCMonth() + 1)).substr(-2))
            .replace(/DD/, ('0' + date.getUTCDate()).substr(-2))
            .replace(/hh/, ('0' + date.getUTCHours()).substr(-2))
            .replace(/mm/, ('0' + date.getUTCMinutes()).substr(-2))
            .replace(/ss/, ('0' + date.getUTCSeconds()).substr(-2));
    });
    phonyData.define('format', (format: string) => {
        return format
            .toString()
            .replace(/#/g, phonyData._digit)
            .replace(/A/g, phonyData._letterUpper)
            .replace(/a/g, phonyData._letterLower)
            .replace(/X/g, phonyData._hexUpper)
            .replace(/x/g, phonyData._hexLower)
            .replace(/Z/g, phonyData._alphaNumericUpper)
            .replace(/z/g, phonyData._alphaNumericLower);
    });
    phonyData.define('parse', (format: string) => {
        const typedPhonyData: TypedPhonyData = phonyData as unknown as TypedPhonyData;

        return format.toString().replace(/\{\{(.*?)\}\}/g, (match, grab) => {
            const elements = grab.replace(/\s*/g, '').split('|');

            return elements.reduce((acc: string, item: string) => {
                try {
                    return typedPhonyData['_' + item](acc);
                } catch (e) {
                    return e.toString();
                }
            }, null);
        });
    });
}
