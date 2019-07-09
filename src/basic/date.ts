import { define } from '..';

export interface PhonyDataAddDate {
    date: Date;
    _date(): Date;
    dateFuture: Date;
    _dateFuture(): Date;
    datePast: Date;
    _datePast(): Date;
}

const oneYearInMs = 31557600000;
const oneSecondInMs = 1000;

export function date() {
    define('date', function() {
        if (this.random < 0.5) {
            return this.dateFuture;
        }

        return this.datePast;
    });
    define('dateFuture', function() {
        const d = new Date();

        // Add one second to ensure it's in the future
        d.setTime(d.getTime() + this.index(oneYearInMs) + oneSecondInMs);

        return d;
    });
    define('datePast', function() {
        const d = new Date();

        // Remove one second to ensure it's in the past
        d.setTime(d.getTime() - this.index(oneYearInMs) - oneSecondInMs);

        return d;
    });
}
