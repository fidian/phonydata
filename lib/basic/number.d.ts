export interface PhonyDataAddNumber {
    index(items: number): number;
    _index(items: number): number;
    integer(min: number, max: number): number;
    _integer(min: number, max: number): number;
}
export declare function number(): void;
