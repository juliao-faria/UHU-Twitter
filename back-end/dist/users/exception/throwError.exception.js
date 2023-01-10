"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowErrorResponse = void 0;
const common_1 = require("@nestjs/common");
class ThrowErrorResponse extends common_1.HttpException {
    constructor(message, httpStatus) {
        super(message, httpStatus);
    }
}
exports.ThrowErrorResponse = ThrowErrorResponse;
//# sourceMappingURL=throwError.exception.js.map