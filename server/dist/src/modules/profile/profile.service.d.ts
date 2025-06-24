import { PrismaService } from "@prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        username: string;
        bio: string | null;
        avatar: string | null;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        username: string;
        bio: string | null;
        avatar: string | null;
        updatedAt: Date;
    }>;
}
