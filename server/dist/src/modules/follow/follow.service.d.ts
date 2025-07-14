import { PrismaService } from "prisma/prisma.service";
export declare class FollowService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    follow(currentUserId: string, targetUserId: string): Promise<{
        createdAt: Date;
        followerId: string;
        followingId: string;
    }>;
    unfollow(currentUserId: string, targetUserId: string): Promise<{
        createdAt: Date;
        followerId: string;
        followingId: string;
    }>;
    getFollowing(userId: string): Promise<{
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
}
