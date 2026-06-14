# Нотатки та відповіді (Урок 20)

## ✍️ Відповіді на питання з теорії:
1. `User` — це сама людина (email, ім'я, аватарка). `Account` — це метод входу. Одна людина може мати кілька акаунтів: GitHub + Google = 2 записи в Account, але 1 запис в User.
2. Prisma дає нам типізацію TypeScript, зручний синтаксис запитів (`prisma.user.findMany()`), і схему як єдине джерело правди. Без Prisma — вручну писати запити і не мати типів.
3. Auth.js не зможе знайти акаунт при логіні (бо шукає через userId), і буде створювати нового User дублікатом кожного разу.

## 📝 Прогрес по практиці:
- [x] MongoDB Atlas налаштовано
- [x] Prisma встановлена та налаштована (v6.19 — бо v7 не підтримує MongoDB!)
- [x] Схема синхронізована (`db push`)
- [x] Файл `lib/db.ts` створено та розібрано
- [x] Адаптер підключено в `auth.ts`
- [x] Челлендж: залогінився через GitHub → юзер з'явився в MongoDB Atlas! 🎉

## ❓ Питання: Навіщо і User, і Account?

**User** — це ЛЮДИНА. Одна людина = один запис назавжди.
Зберігає: `name`, `email`, `image` (аватарка).

**Account** — це СПОСІБ ВХОДУ цієї людини.
Зберігає: `provider` (github/google), `providerAccountId`, токени OAuth.

### Реальний приклад:
Уяви, що ти — Іван Іванов. У тебе є:
- GitHub акаунт з email `ivan@gmail.com`
- Google акаунт з тим же email `ivan@gmail.com`

В базі буде:
```
User (1 запис):
  id: "abc123"
  email: "ivan@gmail.com"
  name: "Ivan Ivanov"

Account (2 записи):
  { userId: "abc123", provider: "github", providerAccountId: "gh_12345" }
  { userId: "abc123", provider: "google", providerAccountId: "go_67890" }
```

Auth.js при логіні через GitHub:
1. Знаходить Account з provider="github" і цим providerAccountId
2. Через `userId` знаходить пов'язаний User
3. Повертає дані User у сесію

**Якщо видалити Account** → логін через GitHub більше не працює, але User (і всі його дані) залишаться в базі.

## ❓ Питання: Як Auth.js розуміє, що через Google зайшла та сама людина, що і через GitHub?

По **email**! Логіка:
1. GitHub дає email `ivan@gmail.com` → User створено
2. Google дає той самий `ivan@gmail.com` → Auth.js знаходить існуючого User і просто додає новий Account (google)
3. Якщо email різні → два окремих User

## ❓ Питання: Навіщо взагалі окрема таблиця Account?

Бо `Account` зберігає **OAuth токени**  (`access_token`, `refresh_token`, `scope`) — специфічні для кожного провайдера.
Якщо б зберігали в `User` — одне поле `access_token` не вмістило б токени одночасно від GitHub і Google.

Формула:
- `User` = ХТО ти є (ім'я, email)
- `Account` = КЛЮЧІ від кожного сервісу окремо

## ⚠️ Важливий урок про версії:
Prisma 7+ НЕ підтримує MongoDB (потребує окремий адаптер, якого ще немає).
Для MongoDB завжди використовувати **Prisma 6.x**.
