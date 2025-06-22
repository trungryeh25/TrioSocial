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
exports.HashtagController = void 0;
const common_1 = require("@nestjs/common");
const hashtag_service_1 = require("./hashtag.service");
let HashtagController = class HashtagController {
    constructor(hashtagService) {
        this.hashtagService = hashtagService;
    }
    findAll() {
        return this.hashtagService.findAll();
    }
    findPostsByHashtag(name) {
        return this.hashtagService.findPostsByHashtag(name);
    }
};
exports.HashtagController = HashtagController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HashtagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name/posts'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HashtagController.prototype, "findPostsByHashtag", null);
exports.HashtagController = HashtagController = __decorate([
    (0, common_1.Controller)('hashtags'),
    __metadata("design:paramtypes", [hashtag_service_1.HashtagService])
], HashtagController);
//# sourceMappingURL=hashtag.controller.js.map