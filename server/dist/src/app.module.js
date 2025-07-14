"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const post_module_1 = require("./modules/post/post.module");
const comment_module_1 = require("./modules/comment/comment.module");
const vote_module_1 = require("./modules/vote/vote.module");
const hashtag_module_1 = require("./modules/hashtag/hashtag.module");
const notification_module_1 = require("./modules/notification/notification.module");
const admin_module_1 = require("./modules/admin/admin.module");
const friend_module_1 = require("./modules/friend/friend.module");
const follow_module_1 = require("./modules/follow/follow.module");
const upload_module_1 = require("./modules/upload/upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            vote_module_1.VoteModule,
            hashtag_module_1.HashtagModule,
            notification_module_1.NotificationModule,
            admin_module_1.AdminModule,
            friend_module_1.FriendModule,
            follow_module_1.FollowModule,
            upload_module_1.UploadModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map