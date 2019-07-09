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
export declare function text(): void;
