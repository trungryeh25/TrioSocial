import { PrismaService } from "prisma/prisma.service";
export declare class FollowService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    follow(currentUserId: string, targetUserId: string): Promise<{
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
    unfollow(currentUserId: string, targetUserId: string): Promise<{
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
    getFollowing(userId: string): Promise<{
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
}
