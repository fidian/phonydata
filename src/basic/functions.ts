import { define } from '..';

export interface PhonyDataAddFunctions {
    dateFormat(format: string, date?: Date): string;
    _dateFormat(format: string, date?: Date): string;
    format(format: string): string;
    _format(format: string): string;
    parse(format: string): string;
    _parse(format: string): string;
}

interface TypedPhonyData {
    [key: string]: (...args: any[]) => any;
}

export function functions() {
    define('dateFormat', function(format: string, date?: Date) {
        function pad(n: number) {
            const s = n.toString();

            if (s.length < 2) {
                return `0${s}`;
            }

            return s;
        }

        if (!(date instanceof Date)) {
            date = this.date;
        }

        // Avoid using these characters because they are already used in ISO
        // 8601: W, T, Z
        return format
            .toString()
            .replace(/YYYY/, date.getUTCFullYear().toString())
            .replace(/MM/, pad(date.getUTCMonth() + 1))
            .replace(/DD/, pad(date.getUTCDate()))
            .replace(/hh/, pad(date.getUTCHours()))
            .replace(/mm/, pad(date.getUTCMinutes()))
            .replace(/ss/, pad(date.getUTCSeconds()));
    });
    define('format', function(format: string) {
        return format
            .toString()
            .replace(/#/g, () => this.digit)
            .replace(/A/g, () => this.letterUpper)
            .replace(/a/g, () => this.letterLower)
            .replace(/X/g, () => this.hexUpper)
            .replace(/x/g, () => this.hexLower)
            .replace(/Z/g, () => this.alphaNumericUpper)
            .replace(/z/g, () => this.alphaNumericLower);
    });
    define('parse', function(format: string) {
        const typedPhonyData: TypedPhonyData = (this as unknown) as TypedPhonyData;

        return format.toString().replace(/\{\{(.*?)\}\}/g, (match, grab) => {
            const elements = grab.replace(/\s*/g, '').split('|');

            return elements.reduce((acc: string, item: string) => {
                try {
                    return typedPhonyData['_' + item](acc);
                } catch (e: any) {
                    return e.toString();
                }
            }, null);
        });
    });
}
