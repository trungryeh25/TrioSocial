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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(authorId, dto) {
        var _a;
        return this.prisma.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                authorId,
                hashtags: {
                    create: ((_a = dto.hashtags) === null || _a === void 0 ? void 0 : _a.map((name) => ({
                        hashtag: {
                            connectOrCreate: {
                                where: { name },
                                create: { name },
                            }
                        }
                    }))) || [],
                },
            },
            include: {
                hashtags: { select: { hashtag: true } },
            },
        });
    }
    async findAll() {
        return this.prisma.post.findMany({
            include: {
                author: true,
                hashtags: { select: { hashtag: true } },
                votes: true,
                comments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                hashtags: { select: { hashtag: true } },
                comments: true,
                votes: true,
            },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async findById(postId) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true,
                hashtags: { include: { hashtag: true } },
                comments: true,
                votes: true,
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async update(id, dto) {
        await this.findOne(id);
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: {
                title: dto.title,
                content: dto.content,
                updatedAt: new Date(),
                hashtags: dto.hashtags
                    ? {
                        deleteMany: {},
                        create: dto.hashtags.map((name) => ({
                            hashtag: {
                                connectOrCreate: {
                                    where: { name: name.trim().toLowerCase() },
                                    create: { name: name.trim().toLowerCase() },
                                },
                            },
                        })),
                    }
                    : undefined,
            },
            include: {
                hashtags: { select: { hashtag: true } },
            },
        });
        return updatedPost;
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.post.delete({ where: { id } });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map