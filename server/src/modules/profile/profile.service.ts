import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                avatar: true,
                createdAt: true,
            },
        });

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async updateProfile(userId: string, dto: UpdateProfileDto) {
        const user = await this.prisma.user.update({
            where: {id: userId},
            data: {
                username: dto.username,
                bio: dto.bio,
                avatar: dto.avatar,
            },
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                avatar: true,
                updatedAt: true,
            },
        });

        return user;
    }
}