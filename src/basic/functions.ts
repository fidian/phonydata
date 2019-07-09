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
        if (!(date instanceof Date)) {
            date = this.date;
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
    define('format', function(format: string) {
        return format
            .toString()
            .replace(/#/g, this._digit)
            .replace(/A/g, this._letterUpper)
            .replace(/a/g, this._letterLower)
            .replace(/X/g, this._hexUpper)
            .replace(/x/g, this._hexLower)
            .replace(/Z/g, this._alphaNumericUpper)
            .replace(/z/g, this._alphaNumericLower);
    });
    define('parse', function(format: string) {
        const typedPhonyData: TypedPhonyData = (this as unknown) as TypedPhonyData;

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
