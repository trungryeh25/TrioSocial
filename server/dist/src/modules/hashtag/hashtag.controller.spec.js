"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const hashtag_controller_1 = require("./hashtag.controller");
describe('HashtagController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [hashtag_controller_1.HashtagController],
        }).compile();
        controller = module.get(hashtag_controller_1.HashtagController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=hashtag.controller.spec.js.map