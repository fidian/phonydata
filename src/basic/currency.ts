import { PhonyData } from '..';
import { currencies, PhonyDataCurrency } from '../data/currencies';

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

export function currency(phonyData: PhonyData) {
    phonyData.define('currency', currencies);
    phonyData.define('currencyCode', () => phonyData.currency.code);
    phonyData.define(
        'currencyDigitalCode',
        () => phonyData.currency.digitalCode
    );
    phonyData.define('currencyName', () => phonyData.currency.name);
    phonyData.define('currencySymbol', () => phonyData.currency.symbol);
}
