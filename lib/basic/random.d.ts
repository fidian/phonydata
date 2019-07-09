export interface PhonyDataAddRandom {
    random: number;
    _random(): number;
    seed(seed: number): void;
    _seed(seed: number): void;
}
export declare function random(): void;
