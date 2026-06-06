# Нотатки — Урок 4: Metadata API та SEO

## 📝 Відповіді на практичні задачі

### Задача 1: Статичні метадані

> (Заповни після виконання)

Додай до головної сторінки (`app/page.tsx`) метадані:
- `title: 'Головна | Next.js 16 Курс'`
- `description: 'Мій курс з вивчення Next.js 16'`



---

### Задача 2: Template у layout

> (Заповни після виконання)

У `app/layout.tsx` налаштуй `title.template` так, щоб всі сторінки автоматично мали суфікс `| DevCourse`.

Тобто якщо сторінка задає `title: 'Про мене'` — у браузері має бути `"Про мене | DevCourse"`.

---

### Задача 3: Теоретична — generateMetadata

> (Заповни тут — що повернула б функція для `/posts/nextjs-routing`?)

Напиши код функції `generateMetadata`, яка для сторінки `/posts/nextjs-routing` поверне title `"Next.js Routing | DevCourse"`.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params // отримали "nextjs-routing"
  
  const titles: Record<string, string> = {
    'nextjs-routing': 'Next.js Routing',
    'react-hooks': 'React Hooks'
  }

  return {
    title: titles[slug] || 'Стаття'
  }
}

---

## 💡 Ключові інсайти

> (Записуй «а-га!» моменти тут)
"Next.js автоматично виконує аналог useParams і передає об'єкт з усіма параметрами, які треба діставати через await бо params — це Promise"
---

## ❓ Питання до ментора

**Питання 1:** Якщо у тебе в `layout.tsx` задано `title: 'My App'`, а в `page.tsx` ти нічого не написав — який заголовок побачить користувач?
**Відповідь:** `My App` (успадкується з layout).

**Питання 2:** Чому ми пишемо `await params` в Next.js 16, а не просто `params.slug`?
**Відповідь:** Тому що `params` в Next.js тепер повертає `Promise`.

---

**Дата уроку:** 09.05.2026
