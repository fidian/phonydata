export interface PhonyDataAddBinary {
    byteValue: number;
    _byteValue(): number;
    byteHex: string;
    _byteHex(): string;
    hexLower: string;
    _hexLower(): string;
    hexUpper: string;
    _hexUpper(): string;
    uuid: string;
    _uuid(): string;
}
export declare function binary(): void;
