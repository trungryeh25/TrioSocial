"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const vote_service_1 = require("./vote.service");
describe('VoteService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [vote_service_1.VoteService],
        }).compile();
        service = module.get(vote_service_1.VoteService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vote.service.spec.js.map