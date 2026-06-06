# Урок 4: Метадані і SEO (metadata API)

## 🎯 Мета уроку
- Зрозуміти, як Next.js 16 керує `<head>` без `react-helmet` і без ручного HTML
- Навчитись задавати статичні та динамічні метадані
- Зробити сторінки правильно індексованими для пошукових систем

---

## 📖 Теорія

### Що таке Metadata API і навіщо воно?

У старому React ти мусив підключати бібліотеку `react-helmet` або писати `<head>` вручну. В Next.js 16 цього **не потрібно взагалі**.

Замість цього ти просто **експортуєш об'єкт `metadata`** з будь-якого `page.tsx` або `layout.tsx` — і Next.js сам генерує правильний `<head>` на сервері:

```tsx
export const metadata: Metadata = {
  title: 'Моя сторінка',
  description: 'Опис',
}
```

перетворюється на:

```html
<head>
  <title>Моя сторінка</title>
  <meta name="description" content="Опис" />
</head>
```

> ✅ Ніяких `import Helmet`, ніяких `<Head>` компонентів — все декларативно в одному місці.

---

### 1. Статичні метадані

Використовуй коли title і description **не залежать від даних** — вони відомі заздалегідь:

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Про мене',
  description: 'Дізнайся більше про автора цього сайту',
}

export default function AboutPage() {
  return <main>...</main>
}
```

> ✅ Компонент і метадані — в одному файлі. Нічого зайвого.

---

### 2. Динамічні метадані

Використовуй коли title **залежить від даних** — наприклад, назва статті з БД:

```tsx
// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>  // ← Promise! Це важливо в Next.js 16
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params     // ← await обов'язковий

  // Тут може бути реальний fetch до API або БД:
  // const post = await fetch(`/api/posts/${slug}`).then(r => r.json())

  return {
    title: `Стаття: ${slug}`,
    description: `Читай статтю про ${slug}`,
  }
}
```

**Чому `params` — це `Promise`?** В Next.js 16 всі динамічні параметри (`params`, `searchParams`) є Promise, щоб підтримувати streaming. Тому `await` — обов'язковий.

> 🔑 `generateMetadata` виконується **на сервері до рендеру**. Next.js чекає на метадані, потім будує `<head>`, потім рендерить сторінку.

---

### 3. Каскадність (Cascading Metadata)

Метадані **наслідуються і перекриваються** по ієрархії: `layout.tsx` → `page.tsx`.

```
app/
  layout.tsx    ← metadata: { title: 'Мій сайт' }   (базовий — найнижчий пріоритет)
  page.tsx      ← metadata: { title: 'Головна' }     (перекриває layout)
  about/
    page.tsx    ← metadata: { title: 'Про мене' }    (перекриває layout)
  blog/
    page.tsx    ← (без metadata)                      (залишається title з layout!)
```

| URL | Активний title |
|-----|---------------|
| `/` | `Головна` |
| `/about` | `Про мене` |
| `/blog` | `Мій сайт` (fallback з layout) |

> ⚠️ Метадані **не мержаться повністю** — `page.tsx` повністю замінює відповідне поле з `layout.tsx`. Тобто якщо в layout є `openGraph`, а в page — ні, то на цій сторінці `openGraph` з layout залишиться. Але якщо page задає своє `openGraph` — воно повністю замінює layout'ове.

---

### 4. `title.template` — автоматичний суфікс

Проблема: якщо в тебе 20 сторінок і всі мають `" | DevCourse"` в кінці — копіювати це скрізь погано.

Рішення — **`template`** в `layout.tsx`:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | DevCourse',  // %s замінюється на title конкретної сторінки
    default: 'DevCourse',        // показується якщо сторінка не задала title взагалі
  },
}
```

```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  title: 'Про мене',  // %s = 'Про мене' → у браузері: "Про мене | DevCourse"
}
```

```tsx
// app/contacts/page.tsx
// (без metadata взагалі) → у браузері: "DevCourse" (default)
```

> 💡 `%s` — це placeholder. Next.js сам підставляє туди title зі сторінки.

---

### 5. OpenGraph — метадані для соцмереж

Коли хтось ділиться посиланням у Telegram, Facebook, Twitter — вони показують **превʼю**. Це контролює OpenGraph:

```tsx
export const metadata: Metadata = {
  title: 'Моя стаття',
  description: 'Короткий опис',
  openGraph: {
    title: 'Моя стаття',                           // заголовок превʼю
    description: 'Опис для Telegram, Facebook',    // текст під заголовком
    images: ['/og-image.png'],                     // картинка превʼю (1200×630px)
    type: 'article',                               // тип контенту: website | article | ...
  },
}
```

> 💡 `title` і `description` верхнього рівня — для Google. `openGraph.title` і `openGraph.description` — для соцмереж. Можуть відрізнятись!

---

## 💡 Ключові інсайти

1. **Metadata API = `<head>` на сервері** — генерується до відправки HTML, тому Google бачить одразу
2. **`params` — це Promise** у Next.js 16. Завжди `await params` в `generateMetadata`
3. **`template` економить час** — задаєш один раз в layout, всі сторінки отримують суфікс автоматично
4. **`default`** у template — це fallback для сторінок без власного title
5. **OpenGraph ≠ SEO title** — це різні речі для різних споживачів
