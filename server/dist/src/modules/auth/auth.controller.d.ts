import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            bio: string | null;
            avatar: string | null;
        };
        accessToken: string;
    }>;
}
