import { PrismaService } from "@prisma/prisma.module";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findByIdOrThrow(id: string): Promise<UserEntity>;
    update(id: string, data: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
