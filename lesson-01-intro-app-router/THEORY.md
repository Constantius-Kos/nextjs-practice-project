# Урок 1: Що таке Next.js 16 і App Router

## 🎯 Мета уроку
Після цього уроку ти розумієш:
- Що таке Next.js і навіщо він потрібен
- Чим App Router відрізняється від Pages Router
- Що нового у Next.js 16 порівняно з 14/15
- Як виглядає структура Next.js 16 проєкту

---

## 📖 Теорія

### Що таке Next.js?

Next.js — це **React фреймворк** для побудови full-stack веб-застосунків. Якщо React — це «двигун», то Next.js — це «автомобіль» з усім необхідним:
- Маршрутизація (routing)
- Серверний рендеринг (SSR)
- Оптимізація зображень і шрифтів
- API routes (backend прямо у проєкті)
- Кешування

### App Router vs Pages Router

Next.js має дві системи маршрутизації:

| | Pages Router | App Router |
|--|------------|------------|
| **Папка** | `/pages` | `/app` |
| **Версія** | Next.js 1-12 | Next.js 13+ |
| **React** | Client-only | Server + Client |
| **Стан** | Застарілий (legacy) | **Актуальний** |

> **Ми вчимо ТІЛЬКИ App Router.** Pages Router — legacy, нові проєкти не починають з ним.

---

### Що нового у Next.js 16?

#### 1. Turbopack за замовчуванням 🦀
Rust-бандлер замість webpack:
- `next dev` тепер автоматично використовує Turbopack
- У 5-10x швидший Hot Reload
- У 2-5x швидші production builds

#### 2. Cache Components (`"use cache"`) 💾
Нова модель кешування — замість PPR:
```typescript
// Раніше (Next.js 14) — складно і неявно
export const revalidate = 3600;

// Тепер (Next.js 16) — явно і гнучко
async function fetchData() {
  'use cache';
  return await db.query('SELECT * FROM products');
}
```

#### 3. React 19.2 інтеграція ⚛️
- View Transitions — анімації між навігацією
- React Compiler — автоматична мемоізація
- `<Activity>` — фонові задачі

#### 4. `proxy.ts` замість middleware
Чіткіше розділення мережевих меж.

#### 5. Покращені логи та DevTools
Інтеграція з MCP для AI-дебаггінгу.

---

### Структура Next.js 16 проєкту

```
my-app/
├── app/                    # ← Весь App Router тут
│   ├── layout.tsx          # Кореневий layout (обов'язковий)
│   ├── page.tsx            # Головна сторінка (/)
│   ├── loading.tsx         # Скелет завантаження
│   ├── error.tsx           # Обробка помилок
│   ├── not-found.tsx       # Сторінка 404
│   ├── about/
│   │   └── page.tsx        # Сторінка /about
│   └── blog/
│       ├── page.tsx        # Сторінка /blog
│       └── [slug]/
│           └── page.tsx    # Сторінка /blog/my-post
├── components/             # Перевикористовувані компоненти
├── lib/                    # Утиліти, хелпери, DB
├── public/                 # Статичні файли (зображення)
├── next.config.ts          # Конфігурація Next.js
├── tsconfig.json           # TypeScript конфішурація
└── package.json
```

---

### Server Components — головна ідея

У Next.js 16 **всі компоненти Server Components за замовчуванням**:

```typescript
// app/page.tsx — це Server Component (виконується на СЕРВЕРІ)
// Можна робити async! Можна читати з БД прямо тут!
async function HomePage() {
  const data = await fetch('https://api.example.com/data');
  const posts = await data.json();
  
  return (
    <main>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
    </main>
  );
}

export default HomePage;
```

```typescript
// 'use client' — тільки коли потрібен браузер (useState, onClick)
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

## ✍️ Практика (теоретичний урок)

### Задача 1: Перевір розуміння (5 хв)
Відповідь в `notes.md`:

1. Навіщо потрібен Next.js, якщо є React?
2. Чим App Router кращий за Pages Router?
3. Що таке Server Component — де він виконується?

### Zadача 2: Визнач тип компонента (10 хв)
Для кожного сценарію — напиши в `notes.md`: це Server чи Client Component? Чому?

a) Компонент показує список статей з БД  
b) Компонент має кнопку «Лайк» зі станом  
c) Компонент відображає header з назвою сайту  
d) Компонент показує поточний час (оновлюється кожну секунду)  
e) Компонент читає cookies аутентифікації  

---

## ✅ Перевірка розуміння

1. Назви 3 нові фічі Next.js 16 (без підказок)
2. Яка директива перетворює компонент на Client Component?
3. Який файл є обов'язковим кореневим у `/app`?
4. Де виконується Server Component — на сервері чи в браузері?

---

## 📝 Наступний урок

**Урок 2:** Файлова система як маршрутизація — `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

> Підготовка: встанови Node.js 20+ і VS Code якщо ще не зробив.

---

**Статус:** ⬜ Не розпочато  
**Задач виконано:** 0
