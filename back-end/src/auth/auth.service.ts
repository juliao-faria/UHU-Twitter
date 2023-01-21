import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ThrowErrorResponse } from '../users/exception/throwError.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);

    if (user === null) {
      throw new ThrowErrorResponse(
        'Invalid Username, User Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.password !== pass) {
      throw new ThrowErrorResponse(
        'Incorrect Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    await this.validateUser(user.username, user.password)
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
