import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { BCRYPT_SALT_ROUNDS } from "../../../config/constants";
import { ConfigService } from "@nestjs/config";
import { ForbiddenException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    // Block when user selected role ADMIN without 'adminKey'
    if (dto.role === "ADMIN") {
      const expectedKey = this.configService.get<string>("SECRET_ADMIN_KEY");
      if (dto.adminKey !== expectedKey) {
        throw new ForbiddenException("Not allowed to register as ADMIN");
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);

    // ✅ Determine role based on adminKey
    const role = dto.adminKey === process.env.ADMIN_KEY ? "ADMIN" : "USER";

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
        role,
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
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user?.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
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
