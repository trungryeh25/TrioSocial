"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const friend_service_1 = require("./friend.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const create_friend_dto_1 = require("./dto/create-friend.dto");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    sendRequest(userId, dto) {
        return this.friendService.sendRequest(userId, dto);
    }
    acceptRequest(userId, friendId) {
        return this.friendService.acceptRequest(userId, friendId);
    }
    removeFriend(userId, friendId) {
        return this.friendService.removeFriend(userId, friendId);
    }
    getFriends(userId) {
        return this.friendService.getFriends(userId);
    }
    getPending(userId) {
        return this.friendService.getPendingRequests(userId);
    }
    cancelRequest(userId, friendId) {
        return this.friendService.cancelRequest(userId, friendId);
    }
};
exports.FriendController = FriendController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_friend_dto_1.CreateFriendDto]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "sendRequest", null);
__decorate([
    (0, common_1.Patch)(":friendId/accept"),
    __param(0, (0, current_user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Param)("friendId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Delete)(":friendId"),
    __param(0, (0, current_user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Param)("friendId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "removeFriend", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, current_user_decorator_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)("pending"),
    __param(0, (0, current_user_decorator_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getPending", null);
__decorate([
    (0, common_1.Delete)(":friendId/cancel"),
    __param(0, (0, current_user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Param)("friendId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "cancelRequest", null);
exports.FriendController = FriendController = __decorate([
    (0, common_1.Controller)("friends"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [friend_service_1.FriendService])
], FriendController);
//# sourceMappingURL=friend.controller.js.map