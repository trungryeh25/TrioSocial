export declare class UserEntity {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    constructor(partial: Partial<UserEntity>);
}
