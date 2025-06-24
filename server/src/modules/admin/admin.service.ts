import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.module";
import { AdminCreateUserDto } from "./user/dto/admin-create-user.dto";
import { AdminUpdateUserDto } from "./user/dto/admin-update-user.dto";
import { AdminEntity } from "./user/entities/admin-user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AdminCreateUserDto): Promise<AdminEntity> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.prisma.user.create({ data });
    return new AdminEntity(user);
  }

  async findAll(): Promise<AdminEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => new AdminEntity(u));
  }

  async findById(id: string): Promise<AdminEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    return new AdminEntity(user);
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new AdminEntity(user) : null;
  }

  async update(id: string, data: AdminUpdateUserDto): Promise<AdminEntity> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return new AdminEntity(user);
  }

  async remove(id: string): Promise<AdminEntity> {
    const deleted = await this.prisma.user.delete({ where: { id } });
    return new AdminEntity(deleted);
  }
}
