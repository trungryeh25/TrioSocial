import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity").UserEntity[]>;
    findById(id: string): Promise<import("./entities/user.entity").UserEntity>;
    updateUser(id: string, dto: UpdateUserDto): Promise<import("./entities/user.entity").UserEntity>;
}
