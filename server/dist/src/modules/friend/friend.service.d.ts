import { PrismaService } from "prisma/prisma.service";
import { CreateFriendDto } from "./dto/create-friend.dto";
export declare class FriendService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getFriends(userId: string): Promise<{
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
    getFriendsOfUser(userId: string): Promise<{
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
    getPendingRequests(userId: string): Promise<({
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
