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
export declare function functions(phonyData: PhonyData): void;