import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        date: Date;
        _date: () => Date;
        dateFuture: Date;
        _dateFuture: () => Date;
        datePast: Date;
        _datePast: () => Date;
    }
}
export declare function date(phonyData: PhonyData): void;
