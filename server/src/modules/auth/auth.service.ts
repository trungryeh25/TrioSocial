import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { BCRYPT_SALT_ROUNDS } from '../../../config/constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email},
        });

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);
        
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: hashedPassword,
            },
        });

        // Remove password's in response 
        const { password, ...safeUser } = user;

        // accessToken
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });

        return {
            user: safeUser,
            accessToken,
        };
    }      
}
