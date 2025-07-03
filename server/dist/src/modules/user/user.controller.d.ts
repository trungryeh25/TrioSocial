import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FriendService } from "@modules/friend/friend.service";
export declare class UserController {
    private readonly userService;
    private readonly friendService;
    constructor(userService: UserService, friendService: FriendService);
    findAll(): Promise<import("../../common/entities/user.entity").UserEntity[]>;
    findById(id: string): Promise<import("../../common/entities/user.entity").UserEntity>;
    getFriendsOfUser(id: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        password: string;
        bio: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        updatedAt: Date;
    }[]>;
    updateUser(id: string, dto: UpdateUserDto): Promise<import("../../common/entities/user.entity").UserEntity>;
    deleteUser(id: string): Promise<import("../../common/entities/user.entity").UserEntity>;
}
