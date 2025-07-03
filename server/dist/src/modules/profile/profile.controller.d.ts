import { ProfileService } from "./profile.service";
import { UserEntity } from "@modules/user/entities/user.entity";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(user: UserEntity): Promise<{
        createdAt: Date;
        id: string;
        email: string;
        username: string;
        bio: string | null;
        avatar: string | null;
    }>;
    updateProfile(user: UserEntity, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        username: string;
        bio: string | null;
        avatar: string | null;
        updatedAt: Date;
    }>;
}
