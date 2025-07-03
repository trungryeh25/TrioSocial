import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "@common/entities/user.entity";
import { AuthPayload } from '@common/interfaces/auth-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Được inject bởi JwtStrategy
  }
);
