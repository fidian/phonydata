import { PhonyData } from '..';
import { PhonyDataCurrency } from '../data/currencies';
declare module '..' {
    interface PhonyData {
        currency: PhonyDataCurrency;
        _currency: () => PhonyDataCurrency;
        currencyCode: string;
        _currencyCode: () => string;
        currencyDigitalCode: string;
        _currencyDigitalCode: () => string;
        currencyName: string;
        _currencyName: () => string;
        currencySymbol: string;
        _currencySymbol: () => string;
    }
}
export declare function currency(phonyData: PhonyData): void;
