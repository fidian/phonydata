import { define } from '..';
import { PhonyDataMethods } from '../datatypes/phony-data-methods';

export interface PhonyDataAddFunctions {
    dateFormat(format: string, date?: Date): string;
    _dateFormat(format: string, date?: Date): string;
    format(format: string): string;
    _format(format: string): string;
    parse(format: string): string;
    _parse(format: string): string;
}

export function functions() {
    define('dateFormat', function (format: string, date?: Date) {
        function pad(n: number) {
            const s = n.toString();

            if (s.length < 2) {
                return `0${s}`;
            }

            return s;
        }

        if (!(date instanceof Date)) {
            date = this.date as Date;
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
    define('format', function (format: string) {
        const typedPhonyData = this as unknown as PhonyDataMethods;

        return format.toString().replace(/./g, letter => {
            const mapped = this._formatMap.get(letter);

            if (!mapped) {
                return letter;
            }

            return typedPhonyData[`_${mapped}`]();
        });
    });
    define('parse', function (format: string) {
        const typedPhonyData = this as unknown as PhonyDataMethods;

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
