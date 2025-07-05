import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FriendService } from "@modules/friend/friend.service";
import { UserEntity } from "@common/entities/user.entity";
export declare class UserController {
    private readonly userService;
    private readonly friendService;
    constructor(userService: UserService, friendService: FriendService);
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity>;
    getFriendsOfUser(id: string): Promise<{
        id: string;
        email: string;
        username: string;
        password: string;
        bio: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUser(id: string, dto: UpdateUserDto, currentUser: UserEntity): Promise<UserEntity>;
    deleteUser(id: string, currentUser: UserEntity): Promise<UserEntity>;
}
