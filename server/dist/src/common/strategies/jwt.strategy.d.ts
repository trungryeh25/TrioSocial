import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthPayload } from "@common/interfaces/auth-payload.interface";
import { UserService } from "@modules/user/user.service";
import { UserEntity } from "@common/entities/user.entity";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: AuthPayload): Promise<UserEntity>;
}
export {};
