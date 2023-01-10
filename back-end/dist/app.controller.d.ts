import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/createUser.dto';
export declare class AppController {
    private authService;
    private readonly appService;
    constructor(authService: AuthService, appService: AppService);
    getHello(): string;
    login(req: any): Promise<{
        access_token: string;
    }>;
    signup(user: CreateUserDto): Promise<any>;
    getProfile(req: any): any;
}
