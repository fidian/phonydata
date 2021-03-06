"use strict";

module.exports = {
    date: function () {
        if (this.random < 0.5) {
            return this.dateFuture;
        }

        return this.datePast;
    },
    dateFuture: function () {
        const d = new Date(),
            future = new Date();

        future.setFullYear(future.getFullYear() + 1);
        d.setTime(this.integer(d.getTime() + 1000, future.getTime()));

        return d;
    },
    datePast: function () {
        const d = new Date(),
            past = new Date();

        past.setFullYear(past.getFullYear() - 1);
        d.setTime(this.integer(d.getTime() - 1000, past.getTime()));

        return d;
    }
};
