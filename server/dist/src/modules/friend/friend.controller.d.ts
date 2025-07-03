import { FriendService } from "./friend.service";
import { CreateFriendDto } from "./dto/create-friend.dto";
export declare class FriendController {
    private readonly friendService;
    constructor(friendService: FriendService);
    sendRequest(userId: string, dto: CreateFriendDto): Promise<{
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
        createdAt: Date;
    }>;
    acceptRequest(userId: string, friendId: string): Promise<{
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
        createdAt: Date;
    }>;
    removeFriend(userId: string, friendId: string): Promise<void>;
    getFriends(id: string): Promise<{
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
    getPending(userId: string): Promise<({
        user: {
            id: string;
            createdAt: Date;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
        createdAt: Date;
    })[]>;
    cancelRequest(userId: string, friendId: string): Promise<{
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
        createdAt: Date;
    }>;
}
