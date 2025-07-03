import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "@common/entities/user.entity";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Được inject bởi JwtStrategy
  }
);
