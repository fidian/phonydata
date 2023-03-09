export interface PhonyDataAddBinary {
    byteHex: string;
    _byteHex(): string;
    byteValue: number;
    _byteValue(): number;
    hexLower: string;
    _hexLower(): string;
    hexUpper: string;
    _hexUpper(): string;
    uuid: string;
    _uuid(): string;
}
export declare function binary(): void;
