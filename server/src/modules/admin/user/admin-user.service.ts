import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.module";
import { AdminCreateUserDto } from "./dto/admin-create-user.dto";
import { AdminUpdateUserDto } from "./dto/admin-update-user.dto";
import { UserEntity } from "@common/entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AdminCreateUserDto): Promise<UserEntity> {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashed },
    });
    return new UserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => new UserEntity(u));
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new UserEntity(user) : null;
  }

  async findByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id: string, data: AdminUpdateUserDto): Promise<UserEntity> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return new UserEntity(user);
  }

  async remove(id: string): Promise<UserEntity> {
    const deleted = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(deleted);
  }
}
