import { FollowService } from "./follow.service";
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    follow(userId: string, targetId: string): Promise<{
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
    unfollow(userId: string, targetId: string): Promise<{
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
