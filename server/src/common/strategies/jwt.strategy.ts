import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthPayload } from "@common/interfaces/auth-payload.interface";
import { UserService } from "@modules/user/user.service";
import { UserEntity } from "@common/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService
  ) {
    const jwtSecret = configService.get<string>("JWT_SECRET");
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthPayload): Promise<UserEntity> {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        "Invalid token or user no longer exists."
      );
    }

    return new UserEntity({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  }
}
