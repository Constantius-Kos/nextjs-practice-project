# 📖 Теорія Уроку 16: Route Handlers

У Next.js 16 ми можемо створювати власні API-ендпоінти. Це як маленькі серверні функції, які чекають на запит (GET, POST тощо) за певною адресою.

---

### 1. 📂 Правила файлової структури
- API-роути завжди мають назву `route.ts`.
- Вони працюють за тією ж логікою папок, що і сторінки (`page.tsx`).
- **ВАЖЛИВО:** В одній папці НЕ МОЖЕ бути одночасно `page.tsx` та `route.ts`.

**Приклад:** 
`app/api/projects/route.ts` ➡️ буде доступний за адресою `/api/projects`.

---

### 2. 🔌 Як виглядає базова структура
Ми експортуємо функції з назвами HTTP-методів (завжди великими літерами):

```typescript
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Привіт з бекенду!" });
}
```

---

### 3. 📥 Прийом даних (POST)
Коли ми хочемо щось створити або змінити, ми використовуємо POST і читаємо тіло запиту (Body):

```typescript
export async function POST(request: Request) {
  const body = await request.json(); // Отримуємо дані від клієнта
  
  console.log("Отримано дані:", body);
  
  return NextResponse.json({ 
    success: true, 
    receivedData: body 
  }, { status: 201 });
}
```

---

### 4. ⚡️ Навіщо вони потрібні, якщо є Server Actions?
- **Server Actions:** Для форм і внутрішньої логіки твого сайту.
- **Route Handlers:** Коли ти хочеш, щоб до твоїх даних міг звернутися хтось інший (мобільний додаток, інший сайт або твій власний Client Component через `fetch`).

---

### ✍️ Практика

#### Задача 1: Перший Ендпоінт
Створи `app/api/status/route.ts`.
- Реалізуй GET-метод, який повертає `{ status: "online", time: "поточний час" }`.
- Перевір його, просто ввівши в браузері `localhost:3000/api/status`.

#### Задача 2: Обробка POST
Створи `app/api/feedback/route.ts`.
- Реалізуй POST-метод.
- Він має приймати об'єкт `{ name: string, message: string }`.
- Повертай відповідь: `"Дякуємо, [name], ваш відгук отримано!"`.

#### Задача 3: Інтеграція (Challenge)
Створи API, який повертає список твоїх проектів з `projects.json`. Додай до нього `"use cache"` та `cacheLife('minutes')` прямо всередині GET-методу. Так-так, Route Handlers теж вміють кешуватися!
