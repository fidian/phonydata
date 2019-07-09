import { define } from '..';

export interface PhonyDataAddText {
    dateText(d: Date): string;
    _dateText(d: Date): string;
    dateTimeCondensed(d: Date): string;
    _dateTimeCondensed(d: Date): string;
    dateTimeOffset(d: Date): string;
    _dateTimeOffset(d: Date): string;
    dateTimeMinuteZ(d: Date): string;
    _dateTimeMinuteZ(d: Date): string;
    dateTimeZ(d: Date): string;
    _dateTimeZ(d: Date): string;
    digit: string;
    _digit(): string;
}

export function text() {
    define('dateText', function(d: Date) {
        this.dateFormat('YYYY-MM-DD', d);
    });
    define('dateTimeCondensed', function(d: Date) {
        this.dateFormat('YYYYMMDDThhmmssZ', d);
    });
    define('dateTimeOffset', function(d: Date) {
        this.dateFormat('YYYY-MM-DDThh:mm:ss+00:00', d);
    });
    define('dateTimeMinuteZ', function(d: Date) {
        this.dateFormat('YYYY-MM-DDThh:mmZ', d);
    });
    define('dateTimeZ', function(d: Date) {
        this.dateFormat('YYYY-MM-DDThh:mm:ssZ', d);
    });
    define('digit', '0123456789'.split(''));
}
