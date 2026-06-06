# Урок 2: Файлова система як маршрутизація

## 🎯 Мета уроку
Після цього уроку ти зможеш:
- Пояснити як папки і файли в `app/` перетворюються на URL
- Створити сторінки, layout'и, стани завантаження і помилок
- Розуміти ієрархію layout'ів і як вони вкладаються

---

## 📖 Теорія

### Головна ідея: папка = URL-сегмент

В Next.js **не потрібно налаштовувати роутер вручну**. Структура папок в `app/` — це і є твої маршрути.

```
app/
├── page.tsx          →  /
├── about/
│   └── page.tsx      →  /about
├── blog/
│   ├── page.tsx      →  /blog
│   └── post-1/
│       └── page.tsx  →  /blog/post-1
```

### Зарезервовані імена файлів

Next.js резервує певні імена файлів — кожен має свою роль:

| Файл | URL | Призначення |
|------|-----|-------------|
| `page.tsx` | `/шлях` | Сама сторінка (публічний контент) |
| `layout.tsx` | (обгортка) | Спільна обгортка для сторінок |
| `loading.tsx` | (автомат) | Показується поки сторінка завантажується |
| `error.tsx` | (автомат) | Показується при помилці |
| `not-found.tsx` | (автомат) | Сторінка 404 |
| `template.tsx` | (рідко) | Як layout, але перерендерюється при навігації |

---

### layout.tsx — серце Next.js

`layout.tsx` — це обгортка, яка **зберігається** між переходами між сторінками. Браузер не перезавантажує layout при навігації — тільки `{children}` змінюються.

```tsx
// app/layout.tsx — кореневий layout (обов'язковий!)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>
        <Header />       {/* ← рендериться ОДИН РАЗ */}
        <main>
          {children}     {/* ← тут змінюється контент сторінок */}
        </main>
        <Footer />       {/* ← рендериться ОДИН РАЗ */}
      </body>
    </html>
  )
}
```

### Вкладені layout'и

Layout'и вкладаються один в одного — як матрьошки:

```
app/
├── layout.tsx        ← RootLayout (html, body, Header, Footer)
├── page.tsx          ← Головна сторінка
└── dashboard/
    ├── layout.tsx    ← DashboardLayout (sidebar, etc.)
    ├── page.tsx      ← /dashboard
    └── settings/
        └── page.tsx  ← /dashboard/settings
```

При переході на `/dashboard/settings` рендериться:
```
RootLayout
  └── DashboardLayout
        └── SettingsPage
```

---

### loading.tsx — автоматичний Suspense

Якщо поряд зі сторінкою є `loading.tsx` — Next.js автоматично загортає сторінку в `<Suspense>` і показує loading-стан поки дані завантажуються.

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Завантаження статей...</div>
}
```

---

### error.tsx — обробка помилок

```tsx
// app/blog/error.tsx
'use client' // ← ОБОВ'ЯЗКОВО клієнтський!

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Щось пішло не так!</h2>
      <button onClick={reset}>Спробувати ще раз</button>
    </div>
  )
}
```

> ⚠️ `error.tsx` ЗАВЖДИ має бути Client Component (`'use client'`), бо він використовує обробники подій (`onClick`).

---

## 💡 Ключові інсайти

1. **`page.tsx` робить маршрут публічним** — без нього папка не є URL-сегментом
2. **`layout.tsx` НЕ перезавантажується** при навігації — це велика перевага для UX
3. **`loading.tsx` = безкоштовний Suspense** — Next.js сам турбується про стрімінг
4. **`error.tsx` завжди Client** — бо потребує `onClick` для кнопки "retry"
