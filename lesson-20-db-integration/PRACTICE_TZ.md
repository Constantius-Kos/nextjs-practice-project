# Практика: Підключення Бази Даних

Ця практика розділена на два етапи: Налаштування хмари та Кодування.

---

## 🛠️ Етап 1: MongoDB Atlas (Хмара)
1. Зайди на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Створи новий Cluster (безкоштовний - Shared).
3. Створи базу з назвою `practice-next`.
4. Створи користувача БД та збережи пароль.
5. Отримай **Connection String** (рядк підключення) і додай його в `.env` файл твого проекту як `DATABASE_URL`.
   > Важливо: Рядок має виглядати так: `mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/practice-next?retryWrites=true&w=majority`

---

## 💻 Етап 2: Налаштування в проекті

### Задача 1: Встановлення інструментів
Виконай у терміналі:
```bash
npm install @prisma/client @auth/prisma-adapter
npm install -D prisma
```

### Задача 2: Ініціалізація Prisma
1. Запусти `npx prisma init --datasource-provider mongodb`.
2. Це створить папку `prisma` та файл `schema.prisma`.

### Задача 3: Створення Схеми
Відкрий `prisma/schema.prisma` та додай офіційну схему для Auth.js (я надам її в наступному кроці). 
Після цього виконай:
```bash
npx prisma db push
```
Це створить колекції в твоїй MongoDB.

### Задача 4: Підключення Адаптера
1. Створи файл `lib/db.ts` для ініціалізації Prisma Client.
2. В файлі `auth.ts` імпортуй `PrismaAdapter` та підключи його до конфігурації.

---

## 🏆 Челлендж
Спробуй залогінитись через GitHub після всіх налаштувань. Перевір свою панель керування MongoDB Atlas — там має з'явитися новий запис у колекції `users`.
