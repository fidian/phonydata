import { PhonyData } from '..';
import { mimeTypes } from '../data/mime-types';

const mimeTypeList = Object.keys(mimeTypes);
let fileExtensions: string[] = [];

for (const mimeType of mimeTypeList) {
    const additionalExtensions = mimeTypes[mimeType];

    if (additionalExtensions.length) {
        fileExtensions = fileExtensions.concat(additionalExtensions);
    }
}

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

export function web(phonyData: PhonyData) {
    phonyData.define('cssBasicColorName', [
        'aqua',
        'black',
        'blue',
        'fuchsia',
        'gray',
        'green',
        'lime',
        'maroon',
        'navy',
        'olive',
        'purple',
        'silver',
        'teal',
        'white',
        'yellow'
    ]);
    phonyData.define('cssColorName', [
        'AliceBlue',
        'AntiqueWhite',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black',
        'BlanchedAlmond',
        'Blue',
        'BlueViolet',
        'Brown',
        'Burlywood',
        'CadetBlue',
        'Chartreuse',
        'Chocolate',
        'Coral',
        'CornflowerBlue',
        'CornSilk',
        'Crimson',
        'Cyan',
        'DarkBlue',
        'DarkCyan',
        'DarkGoldenrod',
        'DarkGray',
        'DarkGreen',
        'DarkGrey',
        'DarkKhaki',
        'DarkMagenta',
        'DarkOliveGreen',
        'DarkOrange',
        'DarkOrchid',
        'DarkRed',
        'DarkSalmon',
        'DarkSeaGreen',
        'DarkSlateBlue',
        'DarkSlateGray',
        'DarkSlateGrey',
        'DarkTurquoise',
        'DarkViolet',
        'DeepPink',
        'DeepSkyBlue',
        'DimGray',
        'DimGrey',
        'DodgerBlue',
        'Firebrick',
        'FloralWhite',
        'ForestGreen',
        'Fuchsia',
        'Gainsboro',
        'GhostWhite',
        'Gold',
        'Goldenrod',
        'Gray',
        'Green',
        'GreenYellow',
        'Grey',
        'Honeydew',
        'HotPink',
        'IndianRed',
        'Indigo',
        'Ivory',
        'Khaki',
        'Lavender',
        'LavenderBlush',
        'LawnGreen',
        'LemonChiffon',
        'LightBlue',
        'LightCoral',
        'LightCyan',
        'LightGoldenrodYellow',
        'LightGray',
        'LightGreen',
        'LightGrey',
        'LightPink',
        'LightSalmon',
        'LightSeaGreen',
        'LightSkyBlue',
        'LightSlateGray',
        'LightSlateGrey',
        'LightSteelBlue',
        'LightYellow',
        'Lime',
        'LimeGreen',
        'Linen',
        'Magenta',
        'Maroon',
        'MediumAquamarine',
        'MediumBlue',
        'MediumOrchid',
        'MediumPurple',
        'MediumSeaGreen',
        'MediumSlateBlue',
        'MediumSpringGreen',
        'MediumTurquoise',
        'MediumVioletRed',
        'MidnightBlue',
        'MintCream',
        'MistyRose',
        'Moccasin',
        'NavajoWhite',
        'Navy',
        'OldLace',
        'Olive',
        'OliveDrab',
        'Orange',
        'OrangeRed',
        'Orchid',
        'PaleGoldenrod',
        'PaleGreen',
        'PaleTurquoise',
        'PaleVioletRed',
        'PapayaWhip',
        'PeachPuff',
        'Peru',
        'Pink',
        'Plum',
        'PowderBlue',
        'Purple',
        'Red',
        'RosyBrown',
        'RoyalBlue',
        'SaddleBrown',
        'Salmon',
        'SandyBrown',
        'SeaGreen',
        'Seashell',
        'Sienna',
        'Silver',
        'SkyBlue',
        'SlateBlue',
        'SlateGray',
        'SlateGrey',
        'Snow',
        'SpringGreen',
        'SteelBlue',
        'Tan',
        'Teal',
        'Thistle',
        'Tomato',
        'Turquoise',
        'Violet',
        'Wheat',
        'White',
        'WhiteSmoke',
        'Yellow',
        'YellowGreen'
    ]);
    phonyData.define('fileExtension', fileExtensions);
    phonyData.define('mimeType', mimeTypeList);
    phonyData.define('rgbHex', '#' + phonyData.format('xxxxxx'));
}
