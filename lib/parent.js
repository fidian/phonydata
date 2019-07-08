"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child1_1 = require("./child1");
var ParentThing = /** @class */ (function () {
    function ParentThing() {
    }
    return ParentThing;
}());
exports.ParentThing = ParentThing;
// Add extra methods to this object.
child1_1.child1(ParentThing.prototype);
// Imagine many more get added as well.
