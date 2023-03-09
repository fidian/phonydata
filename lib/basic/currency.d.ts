import { PhonyDataCurrency } from '../data/currencies';
export interface PhonyDataAddCurrency {
    currency: PhonyDataCurrency;
    _currency(): PhonyDataCurrency;
    currencyCode: string;
    _currencyCode(): string;
    currencyDigitalCode: string;
    _currencyDigitalCode(): string;
    currencyName: string;
    _currencyName(): string;
    currencySymbol: string;
    _currencySymbol(): string;
}
export declare function currency(): void;
