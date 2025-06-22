import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // giúp module dùng được toàn app mà không cần import lại
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

export { PrismaService };