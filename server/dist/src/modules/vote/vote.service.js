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
exports.VoteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let VoteService = class VoteService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async vote(userId, dto) {
        const post = await this.prisma.post.findUnique({
            where: { id: dto.postId },
            include: {
                author: true,
            },
        });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        const existingVote = await this.prisma.vote.findUnique({
            where: {
                postId_userId: {
                    postId: dto.postId,
                    userId: userId,
                },
            },
        });
        if (existingVote) {
            const updatedVote = await this.prisma.vote.update({
                where: {
                    postId_userId: {
                        postId: dto.postId,
                        userId: userId,
                    },
                },
                data: { value: dto.value },
            });
            return updatedVote;
        }
        else {
            const newVote = await this.prisma.vote.create({
                data: {
                    postId: dto.postId,
                    userId: userId,
                    value: dto.value,
                },
            });
            if (userId !== post.author.id) {
                await this.notificationService.create({
                    type: "vote",
                    message: `Your post "${post.title}" got a new vote!`,
                    recipientId: post.author.id,
                    userId: userId,
                });
            }
            return newVote;
        }
    }
    async removeVote(userId, postId) {
        const vote = await this.prisma.vote.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
        if (!vote)
            throw new common_1.NotFoundException("Vote not found");
        return this.prisma.vote.delete({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
    }
};
exports.VoteService = VoteService;
exports.VoteService = VoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], VoteService);
//# sourceMappingURL=vote.service.js.map