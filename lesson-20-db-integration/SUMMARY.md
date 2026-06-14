# SUMMARY: Урок 20 — Інтеграція Auth.js з Базою Даних

## 🎯 Що вивчили:
1. **Проблема JWT-only**: без БД ми не бачимо users і не можемо зберігати додаткові дані.
2. **Auth.js Adapter**: це "перекладач" між Auth.js та базою даних. При логіні він автоматично створює/оновлює User, Account і Session в MongoDB.
3. **Prisma ORM**: описуємо структуру даних у `schema.prisma`, отримуємо типізований клієнт для TypeScript.
4. **Singleton pattern**: `globalForPrisma` в `lib/db.ts` запобігає створенню тисяч підключень при hot-reload у Next.js dev режимі.

## 🏗️ Архітектура:
```
GitHub OAuth → Auth.js → PrismaAdapter → PrismaClient → MongoDB Atlas
```

## 📁 Файли, які створили:
- `prisma/schema.prisma` — 4 моделі: User, Account, Session, VerificationToken
- `lib/db.ts` — singleton Prisma Client
- `auth.ts` — + `PrismaAdapter(db)` у конфігурації

## ⚠️ Критична замітка для майбутнього:
**Prisma 7+ не підтримує MongoDB!** Використовуй `prisma@6.x` + `@prisma/client@6.x` для MongoDB проєктів.

## ✅ Результат:
Після логіну через GitHub → в MongoDB Atlas автоматично з'явились колекції:
- `User` (ім'я, email, аватарка з GitHub)
- `Account` (дані OAuth провайдера)
- `Session` (активна сесія)
