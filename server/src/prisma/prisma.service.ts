import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('[PrismaService] Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('[PrismaService] Disconnected from database');
  }
  
  // Optional: transaction helper
  async transaction<T>(fn: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return await this.$transaction(fn);
  }
}