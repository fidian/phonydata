import { PhonyData } from '..';
export interface PhonyDataLocality {
    addressLine1: string;
    city: string;
    stateOrProvince: string;
    postCode: string;
}
declare module '..' {
    interface PhonyData {
        addressLine1: string;
        _addressLine1: () => string;
        alphaNumericLower: string;
        _alphaNumericLower: () => string;
        alphaNumericUpper: string;
        _alphaNumericUpper: () => string;
        buildingNumber: number;
        _buildingNumber: () => number;
        city: string;
        _city: () => string;
        givenName: string;
        _givenName: () => string;
        givenNameFemale: string;
        _givenNameFemale: () => string;
        givenNameMale: string;
        _givenNameMale: () => string;
        letterLower: string;
        _letterLower: () => string;
        letterUpper: string;
        _letterUpper: () => string;
        locality: PhonyDataLocality;
        _locality: PhonyDataLocality;
        phoneNumber: string;
        _phoneNumber: () => string;
        personName: string;
        _personName: () => string;
        postCode: string;
        _postCode: () => string;
        sentence: string;
        _sentence: () => string;
        sentencePunctuation: string;
        _sentencePunctuation: () => string;
        stateOrProvince: string;
        _stateOrProvince: () => string;
        streetName: string;
        _streetName: () => string;
        surname: string;
        _surname: () => string;
        title: string;
        _title: () => string;
        titleWords: (num?: number) => string;
        _titleWords: (num?: number) => string;
        word: string;
        _word: () => string;
        words: (num?: number) => string;
        _words: (num?: number) => string;
        currencyValue: number;
        _currencyValue: () => number;
    }
}
export declare function locale(phonyData: PhonyData): void;
