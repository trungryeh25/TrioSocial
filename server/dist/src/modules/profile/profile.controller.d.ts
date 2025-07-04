import { ProfileService } from "./profile.service";
import { UserEntity } from "@common/entities/user.entity";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(user: UserEntity): Promise<{
        id: string;
        email: string;
        username: string;
        bio: string | null;
        avatar: string | null;
        createdAt: Date;
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
