import { PrismaService } from "@prisma/prisma.service";
export declare class VoteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    vote(postId: string, userId: string, value: number): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        postId: string;
        value: number;
    }>;
    removeVote(postId: string, userId: string): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        postId: string;
        value: number;
    }>;
}
