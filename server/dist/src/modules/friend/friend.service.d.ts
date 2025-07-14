import { PrismaService } from "prisma/prisma.service";
import { CreateFriendDto } from "./dto/create-friend.dto";
export declare class FriendService {
    private prisma;
    constructor(prisma: PrismaService);
    sendRequest(userId: string, dto: CreateFriendDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    }>;
    acceptRequest(userId: string, friendId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    }>;
    removeFriend(userId: string, friendId: string): Promise<void>;
    getFriends(userId: string): Promise<{
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
    getFriendsOfUser(userId: string): Promise<{
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
    getPendingRequests(userId: string): Promise<({
        user: {
            id: string;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    })[]>;
    cancelRequest(userId: string, friendId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        friendId: string;
        status: import(".prisma/client").$Enums.FriendStatus;
    }>;
}
