import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
// import { APP_PORT } from "../config/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3001",
    credentials: true,
  })

  const configService = app.get(ConfigService);
  const port = configService.get("PORT") || 3000;

  await app.listen(port);
  console.log(`🚀 Server is running at http://localhost:${port}`);
}

bootstrap();
