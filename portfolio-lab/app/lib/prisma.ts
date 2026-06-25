import { PrismaClient } from "@prisma/client";

// 1. Оголошуємо глобальну змінну для Prisma (це важливо для TypeScript)
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// 2. Використовуємо існуюче підключення або створюємо нове
export const db = globalForPrisma.prisma ?? prismaClientSingleton();

// 3. Якщо ми в режимі розробки, зберігаємо підключення в globalThis
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
