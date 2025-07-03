import { FriendService } from "./friend.service";
import { CreateFriendDto } from "./dto/create-friend.dto";
export declare class FriendController {
    private readonly friendService;
    constructor(friendService: FriendService);
    sendRequest(userId: string, dto: CreateFriendDto): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    }>;
    acceptRequest(userId: string, friendId: string): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    }>;
    removeFriend(userId: string, friendId: string): Promise<void>;
    getFriends(id: string): Promise<{
        createdAt: Date;
        id: string;
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
            createdAt: Date;
            id: string;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            updatedAt: Date;
        };
    } & {
        createdAt: Date;
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    })[]>;
    cancelRequest(userId: string, friendId: string): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    }>;
}
