import { PrismaService } from "@prisma/prisma.service";
export declare class VoteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    vote(postId: string, userId: string, value: number): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        postId: string;
        value: number;
    }>;
    removeVote(postId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        postId: string;
        value: number;
    }>;
}
