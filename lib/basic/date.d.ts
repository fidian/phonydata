export interface PhonyDataAddDate {
    date: Date;
    _date(): Date;
    dateFuture: Date;
    _dateFuture(): Date;
    datePast: Date;
    _datePast(): Date;
}
export declare function date(): void;
