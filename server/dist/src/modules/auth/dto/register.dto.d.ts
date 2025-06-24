export declare class RegisterDto {
    email: string;
    username: string;
    password: string;
    role?: "USER" | "ADMIN";
    adminKey?: string;
}
