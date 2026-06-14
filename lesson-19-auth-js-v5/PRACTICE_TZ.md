# Повне ТЗ: Аутентифікація Auth.js v5

**Мета**: Реалізувати повноцінний цикл входу/виходу через GitHub OAuth у нашому `practice-project`.

---

## 🛠️ Етап 1: Конфігурація та Секрети
1. **Файл `.env`**:
   - Створи файл `.env` у корені `/practice-project`.
   - Додай `AUTH_SECRET` (можна згенерувати через `npx auth secret`).
   - Додай `AUTH_GITHUB_ID` та `AUTH_GITHUB_SECRET` (отримати в GitHub Developer Settings).
2. **Файл `auth.ts`**:
   - Перевір, що `GitHub` провайдер доданий у масив `providers`.
3. **Route Handler**:
   - Перевір існування `app/api/auth/[...nextauth]/route.ts`.

---

## 🏗️ Етап 2: Компоненти Інтерфейсу
1. **LoginButton.tsx** (Клієнтський):
   - Використовує `signIn('github')`.
2. **LogoutButton.tsx** (Клієнтський):
   - Створи новий компонент, що використовує `signOut()`.

---

## 🔗 Етап 3: Інтеграція в Header
1. **Серверна сесія**:
   - У `app/components/Header.tsx` зроби компонент асинхронним (`async function Header()`).
   - Виклич `const session = await auth()`.
2. **Умовний рендеринг**:
   - Якщо `session` є: покажи ім'я користувача (`session.user?.name`) + `<LogoutButton />`.
   - Якщо `session` немає: покажи `<LoginButton />`.

---

## ✅ Етап 4: Перевірка
1. Зайди на головну сторінку.
2. Натисни "Login via GitHub".
3. Після редиректу перевір, чи з'явилося твоє ім'я в хедері.
4. Натисни "Logout" і перевір, чи повернулася кнопка входу.
