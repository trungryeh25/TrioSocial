// import { PrismaClient } from "@prisma/client";

// // Để tránh tạo nhiều instance khi hot-reload (dev)
// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
