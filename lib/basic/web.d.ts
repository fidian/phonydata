import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        cssBasicColorName: string;
        _cssBasicColorName: () => string;
        cssColorName: string;
        _cssColorName: () => string;
        fileExtension: string;
        _fileExtension: () => string;
        mimeType: string;
        _mimeType: () => string;
        rgbHex: string;
        _rgbHex: () => string;
    }
}
export declare function web(phonyData: PhonyData): void;