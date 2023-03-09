import { define } from '..';
import { currencies } from '../data/currencies';
import { PhonyDataCurrency } from '../datatypes/phony-data-currency';

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

export function currency() {
    define('currency', currencies);
    define('currencyCode', function () {
        return this.currency.code;
    });
    define('currencyDigitalCode', function () {
        return this.currency.digitalCode;
    });
    define('currencyName', function () {
        return this.currency.name;
    });
    define('currencySymbol', function () {
        return this.currency.symbol;
    });
}
