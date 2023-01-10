import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ThrowErrorResponse extends HttpException {
    constructor(message: string, httpStatus: HttpStatus);
}
