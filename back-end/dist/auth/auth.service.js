"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const throwError_exception_1 = require("../users/exception/throwError.exception");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findUser(username);
        if (user === null) {
            throw new throwError_exception_1.ThrowErrorResponse('Invalid Username, User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.password !== pass) {
            throw new throwError_exception_1.ThrowErrorResponse('Incorrect Password', common_1.HttpStatus.BAD_REQUEST);
        }
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signup(user) {
        user['userId'] = (0, uuid_1.v4)();
        const createdUser = new this.usersService.usersModel(user);
        let result;
        try {
            result = await createdUser.save();
        }
        catch (Exception) {
            if (Exception.code === 11000) {
                return new throwError_exception_1.ThrowErrorResponse('Username Already Exists', common_1.HttpStatus.BAD_REQUEST);
            }
            return new throwError_exception_1.ThrowErrorResponse('Unable to signup', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const _a = result['_doc'], { _id, __v, createdAt, updatedAt } = _a, newUser = __rest(_a, ["_id", "__v", "createdAt", "updatedAt"]);
        return newUser;
    }
    async verifyToken(token) {
        return await this.jwtService.verifyAsync(token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map