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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_entity_1 = require("../../common/entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        });
        return new user_entity_1.UserEntity(user);
    }
    async findAll() {
        const users = await this.prisma.user.findMany();
        return users.map((u) => new user_entity_1.UserEntity(u));
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? new user_entity_1.UserEntity(user) : null;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? new user_entity_1.UserEntity(user) : null;
    }
    async findByIdOrThrow(id) {
        const user = await this.findById(id);
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return user;
    }
    async update(id, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = await this.prisma.user.update({
            where: { id },
            data,
        });
        return new user_entity_1.UserEntity(user);
    }
    async remove(id) {
        const deleted = await this.prisma.user.delete({ where: { id } });
        return new user_entity_1.UserEntity(deleted);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map