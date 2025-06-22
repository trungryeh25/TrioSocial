"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const vote_controller_1 = require("./vote.controller");
describe('VoteController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [vote_controller_1.VoteController],
        }).compile();
        controller = module.get(vote_controller_1.VoteController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=vote.controller.spec.js.map