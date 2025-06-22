import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateUserDto): Promise<UserEntity>{
        const user = await this.prisma.user.create({data});
        return new UserEntity(user);
    }

    async findAll(): Promise<UserEntity[]>{
        const users = await this.prisma.user.findMany();
        return users.map((u) => new UserEntity(u));
    }

    async findById(id: string): Promise<UserEntity | null>{
        const user = await this.prisma.user.findUnique({where: {id}})
        return user ? new UserEntity(user): null;
    }

    async findByEmail(email: string): Promise<UserEntity |null> {
        const user = await this.prisma.user.findUnique({where: {email}});
        return user ? new UserEntity(user): null;
    }

    async update(id: string, data: UpdateUserDto): Promise<UserEntity>{
        const user = await this.prisma.user.update({
            where: {id},
            data,
        })
        return new UserEntity(user);
    }

    async remove(id: string): Promise<void>{
        await this.prisma.user.delete({where: {id}});
    }
}
