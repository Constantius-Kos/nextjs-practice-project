# Урок 26: Деплой на Vercel та Production Best Practices 🚀

## 1. Чому Vercel?
Vercel — це компанія, яка створила Next.js. Їхня платформа ідеально "заточена" під цей фреймворк:
- **Zero Configuration**: Автоматичне розпізнавання Next.js.
- **Global Edge**: Твоє Middleware та статичні файли розлітаються по всьому світу.
- **Previews**: Кожен твій Push у GitHub створює окрему тимчасову адресу для перевірки коду.

## 2. Процес складання (Build Process)
Коли ти запускаєш `npm run build`, Next.js робить наступне:
1. **Compiling**: Перетворює TS/JSX у чистий JS.
2. **Optimizing**: Стискає зображення, мініфікує CSS.
3. **Static Generation**: Генерує HTML для всіх сторінок, де це можливо.
4. **Server Functions**: Пакує твій серверний код у Lambda-функції.

## 3. Environment Variables у Production
Твої секрети з `.env.local` **не потрапляють** на Vercel через Git. Тобі потрібно:
1. Зайти в налаштування проекту на Vercel.
2. Вручну (або через CLI) додати всі змінні.
3. Перезапустити Deployment.

## 4. Чек-лист перед деплоєм:
- **Linting**: Код має проходити перевірку `npm run lint`.
- **Type Checking**: Немає помилок TypeScript.
- **Images**: Всі картинки використовують `next/image`.
- **Metadata**: Прописані заголовки та описи сторінок для SEO.

## 5. Домени та SSL
Vercel автоматично надає безкоштовний домен `.vercel.app` та SSL-сертифікат (HTTPS). Ти також можеш легко підключити свій власний домен (наприклад, `my-app.com`).
