"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const constants_1 = require("../config/constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    await app.listen(constants_1.APP_PORT);
    console.log(`🚀 Server is running at http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map