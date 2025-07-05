import { FollowService } from "./follow.service";
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    follow(userId: string, targetId: string): Promise<{
        createdAt: Date;
        followerId: string;
        followingId: string;
    }>;
    unfollow(userId: string, targetId: string): Promise<{
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
