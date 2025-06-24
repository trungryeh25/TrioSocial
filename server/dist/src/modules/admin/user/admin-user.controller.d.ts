import { AdminUserService } from "./admin-user.service";
import { AdminCreateUserDto } from "./dto/admin-create-user.dto";
import { AdminUpdateUserDto } from "./dto/admin-update-user.dto";
export declare class AdminUserController {
    private readonly adminUserService;
    constructor(adminUserService: AdminUserService);
    findAll(): Promise<import("../../user/entities/user.entity").UserEntity[]>;
    findById(id: string): Promise<import("../../user/entities/user.entity").UserEntity>;
    create(dto: AdminCreateUserDto): Promise<import("../../user/entities/user.entity").UserEntity>;
    updateUser(id: string, dto: AdminUpdateUserDto): Promise<import("../../user/entities/user.entity").UserEntity>;
    deleteUser(id: string): Promise<import("../../user/entities/user.entity").UserEntity>;
}
