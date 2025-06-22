import { PrismaService } from "@prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        username: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        username: string;
        updatedAt: Date;
        bio: string | null;
        avatar: string | null;
    }>;
}
