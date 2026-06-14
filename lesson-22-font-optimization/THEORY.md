# Урок 22: Оптимізація шрифтів (next/font)

Шрифти — це одна з головних причин **Cumulative Layout Shift (CLS)**. Коли браузер спочатку малює стандартний шрифт, а потім завантажує кастомний і текст "стрибає", Next.js вирішує цю проблему за допомогою пакета `next/font`.

## 🚀 Чому `next/font` — це круто?
1. **Самохостинг (Self-hosting):** Коли ти використовуєш Google Fonts через Next.js, він завантажує їх під час збірки (build time) і зберігає локально. Ніяких зайвих запитів до серверів Google під час роботи сайту!
2. **Нульовий Layout Shift:** Next.js автоматично створює "резервні" (fallback) шрифти, які за розміром ідентичні до твого кастомного. Текст більше не стрибає.
3. **Автоматичний Subsetting:** Next.js завантажує тільки ті символи, які тобі потрібні (наприклад, тільки `latin` або `cyrillic`).
4. **Variable Fonts:** Повна підтримка варіативних шрифтів, які важать менше, але мають багато варіантів товщини.

---

## 🏗️ Як це працює

### 1. Google Fonts
Next.js має вбудовану підтримку всіх Google Fonts.

```tsx
import { Montserrat } from 'next/font/google'

// Створюємо об'єкт шрифту
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap', // Текст відображається одразу
  variable: '--font-montserrat', // CSS змінна для Tailwind
})

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={montserrat.variable}>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
```

### 2. Локальні шрифти
Якщо у тебе є файл `.woff2` або `.ttf`, використовуй `next/font/local`.

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})
```

---

## 🎨 Детальна інтеграція з Tailwind CSS

Next.js та Tailwind найкраще працюють разом через **CSS-змінні**. Це дозволяє тобі не просто один раз застосувати шрифт, а створити гнучку систему, де ти можеш використовувати різні шрифти в будь-якому місці за допомогою стандартних класів Tailwind (наприклад, `font-sans`, `font-mono`, `font-brand`).

### Покроковий алгоритм:

#### Крок 1: Оголошення шрифтів у `layout.tsx`
Ми створюємо об'єкти шрифтів і обов'язково додаємо властивість `variable`. Ця назва (наприклад, `--font-inter`) стане технічним іменем у CSS.

```tsx
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Це ім'я ми передамо в Tailwind
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})
```

#### Крок 2: Передача змінних у HTML
Щоб Tailwind "побачив" ці змінні, їх потрібно додати до батьківського елемента (зазвичай `<html>` або `<body>`).

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${inter.variable} ${robotoMono.variable}`}>
       <body className="antialiased">{children}</body>
    </html>
  )
}
```

#### Крок 3: Реєстрація у `tailwind.config.ts`
Тепер ми пов’язуємо CSS-змінну з класом Tailwind.

```typescript
// tailwind.config.ts
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        // Тепер клас 'font-sans' буде використовувати наш Inter
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        // Створюємо власний клас 'font-mono'
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
    },
  },
}
```

### Чому це вигідно?
1. **Гнучкість:** Ти можеш використовувати `font-sans` для основного тексту і `font-mono` для коду через звичайні класи Tailwind.
2. **Fallback:** У конфігурації Tailwind ми можемо додати стандартні системні шрифти (`ui-sans-serif`) на випадок, якщо кастомний шрифт ще завантажується.
3. **Чистий HTML:** Тобі не потрібно прописувати назву шрифту в кожному тезі `style`, ти просто використовуєш потужність Tailwind.

### Порада:
Якщо ти хочеш зробити шрифт **шрифтом за замовчуванням** для всього сайту, просто перекрий стандартний ключ `sans` у `fontFamily`. Tailwind автоматично застосує його до всього тексту, де не вказано інше.


---

## 📝 Питання для самоперевірки:
1. Що таке **Self-hosting** у контексті Next.js шрифтів?
2. Навіщо нам пропс `subsets`?
3. Чим корисна властивість `variable` в налаштуваннях шрифту?
