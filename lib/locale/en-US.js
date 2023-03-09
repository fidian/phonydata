"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var us_1 = require("../country/us");
var PhonyDataEnUs = /** @class */ (function (_super) {
    __extends(PhonyDataEnUs, _super);
    function PhonyDataEnUs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PhonyDataEnUs;
}(us_1.PhonyDataUs));
exports.PhonyDataEnUs = PhonyDataEnUs;
