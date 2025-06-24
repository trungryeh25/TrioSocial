"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const friend_status_enum_1 = require("./interfaces/friend-status.enum");
let FriendService = class FriendService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendRequest(userId, dto) {
        if (userId === dto.friendId) {
            throw new common_1.ForbiddenException("Cannot friend yourself");
        }
        const existing = await this.prisma.friend.findFirst({
            where: {
                OR: [
                    {
                        userId,
                        friendId: dto.friendId,
                    },
                    {
                        userId: dto.friendId,
                        friendId: userId,
                    },
                ],
            },
        });
        if (existing) {
            throw new common_1.ForbiddenException("Friend request already exists");
        }
        return this.prisma.friend.create({
            data: {
                userId,
                friendId: dto.friendId,
                status: friend_status_enum_1.FriendStatus.PENDING,
            },
        });
    }
    async acceptRequest(userId, friendId) {
        const friend = await this.prisma.friend.findUnique({
            where: {
                userId_friendId: {
                    userId: friendId,
                    friendId: userId,
                },
            },
        });
        if (!friend)
            throw new common_1.NotFoundException("Friend request not found");
        return this.prisma.friend.update({
            where: { userId_friendId: { userId: friendId, friendId: userId } },
            data: { status: friend_status_enum_1.FriendStatus.ACCEPTED },
        });
    }
    async removeFriend(userId, friendId) {
        await this.prisma.friend.deleteMany({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });
    }
    async getFriends(userId) {
        const sent = await this.prisma.friend.findMany({
            where: {
                userId,
                status: friend_status_enum_1.FriendStatus.ACCEPTED,
            },
            include: { friend: true },
        });
        const received = await this.prisma.friend.findMany({
            where: {
                friendId: userId,
                status: friend_status_enum_1.FriendStatus.ACCEPTED,
            },
            include: { user: true },
        });
        return [...sent.map((f) => f.friend), ...received.map((f) => f.user)];
    }
    async getPendingRequests(userId) {
        return this.prisma.friend.findMany({
            where: {
                friendId: userId,
                status: friend_status_enum_1.FriendStatus.PENDING,
            },
            include: { user: true },
        });
    }
    async cancelRequest(userId, friendId) {
        const request = await this.prisma.friend.findUnique({
            where: {
                userId_friendId: {
                    userId,
                    friendId,
                },
            },
        });
        if (!request || request.status !== friend_status_enum_1.FriendStatus.PENDING) {
            throw new common_1.NotFoundException("No pending friend request found");
        }
        return this.prisma.friend.delete({
            where: {
                userId_friendId: {
                    userId,
                    friendId,
                },
            },
        });
    }
};
exports.FriendService = FriendService;
exports.FriendService = FriendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendService);
//# sourceMappingURL=friend.service.js.map