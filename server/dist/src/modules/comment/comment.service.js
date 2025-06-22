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
let CommentService = class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, postId, dto) {
        return this.prisma.comment.create({
            data: {
                content: dto.content,
                postId,
                authorId: userId,
            },
        });
    }
    async findAllByPost(postId) {
        return this.prisma.comment.findMany({
            where: { postId },
            include: { author: true },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(id) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
            include: { author: true, post: true },
        });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        return comment;
    }
    async update(id, dto) {
        const existing = await this.prisma.comment.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Comment not found');
        return this.prisma.comment.update({
            where: { id },
            data: {
                content: dto.content,
            },
        });
    }
    async remove(id) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        return this.prisma.comment.delete({ where: { id } });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map