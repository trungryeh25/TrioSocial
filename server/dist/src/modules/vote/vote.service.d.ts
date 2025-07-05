import { PrismaService } from "@prisma/prisma.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { NotificationService } from "@modules/notification/notification.service";
export declare class VoteService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    vote(userId: string, dto: CreateVoteDto): Promise<{
        id: string;
        userId: string;
        postId: string;
        value: number;
        createdAt: Date;
    }>;
    removeVote(userId: string, postId: string): Promise<{
        id: string;
        userId: string;
        postId: string;
        value: number;
        createdAt: Date;
    }>;
}
