export interface PhonyDataAddGenerators {
    formatGenerator(formats: string[] | string): () => string;
    parseGenerator(formats: string[] | string): () => string;
    sequenceGenerator(values: any[]): () => any;
}
export declare function generators(): void;
