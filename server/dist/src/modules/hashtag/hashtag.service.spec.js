"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const hashtag_service_1 = require("./hashtag.service");
describe('HashtagService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [hashtag_service_1.HashtagService],
        }).compile();
        service = module.get(hashtag_service_1.HashtagService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=hashtag.service.spec.js.map