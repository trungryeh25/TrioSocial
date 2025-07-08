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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let CommentService = class CommentService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async create(userId, dto) {
        const post = await this.prisma.post.findUnique({
            where: { id: dto.postId },
            include: { author: true },
        });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        const comment = await this.prisma.comment.create({
            data: {
                content: dto.content,
                postId: dto.postId,
                authorId: userId,
            },
            include: {
                author: {
                    select: { id: true, username: true, avatar: true },
                },
            },
        });
        if (post.author.id !== userId) {
            await this.notificationService.create({
                type: "comment",
                message: `Your post "${post.title}" has a new comment!`,
                recipientId: post.author.id,
                userId,
                actionId: comment.id,
            });
        }
        return comment;
    }
    async findAll() {
        return this.prisma.comment.findMany({
            include: {
                author: {
                    select: { id: true, username: true, avatar: true },
                },
                post: {
                    select: { id: true, title: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findByPostId(postId) {
        return this.prisma.comment.findMany({
            where: { postId },
            include: {
                author: {
                    select: { id: true, username: true, avatar: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findOne(id) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
            include: {
                author: {
                    select: { id: true, username: true, avatar: true },
                },
                post: true,
            },
        });
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        return comment;
    }
    async update(userId, id, dto) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        if (comment.authorId !== userId)
            throw new common_1.ForbiddenException("You can only edit your own comment");
        return this.prisma.comment.update({
            where: { id },
            data: {
                content: dto.content,
            },
        });
    }
    async remove(userId, id) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        if (comment.authorId !== userId)
            throw new common_1.ForbiddenException("You can only delete your own comment");
        return this.prisma.comment.delete({ where: { id } });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], CommentService);
//# sourceMappingURL=comment.service.js.map