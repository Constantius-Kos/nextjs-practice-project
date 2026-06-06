# 📌 Урок 8: Server Actions

## 🎯 Мета
- Зрозуміти, що таке Server Actions і навіщо вони потрібні.
- Навчитися створювати серверні екшени в окремих файлах.
- Дізнатися, як використовувати директиву `'use server'`.
- Реалізувати першу форму взаємодії без `fetch`.

---

## 📖 Теорія

### 1. Що таке Server Actions?
Це асинхронні функції, які виконуються на **сервері**, але викликаються з **клієнта** (наприклад, при сабміті форми). 
Це альтернатива класичним API Routes.

### 2. Чому це зручно?
- **Zero API boilerplate:** не треба писати `fetch('/api/...)`.
- **Type safety:** оскільки це просто функції, TypeScript перевіряє типи аргументів автоматично.
- **Progressive Enhancement:** форми з Server Actions працюють навіть якщо у користувача вимкнений JavaScript (хоч це і рідкість зараз).

### 3. Директива `'use server'`
Щоб функція стала Server Action, вона повинна мати рядок `'use server'` на початку свого тіла або на початку файлу.

**Важливо:** Не плутай з `'use client'`. `'use server'` означає "цей код — точка входу для клієнта, щоб викликати серверний код".

### 4. Приклад (Вбудований екшен):
```tsx
export default function ContactForm() {
  async function createInvoice(formData: FormData) {
    'use server';
    const email = formData.get('email');
    console.log('Збереження емейлу:', email);
    // Тут логіка запису в БД
  }

  return (
    <form action={createInvoice}>
      <input name="email" type="email" />
      <button type="submit">Надіслати</button>
    </form>
  );
}
```

---

## 💡 Краща практика: окремий файл
Зазвичай екшени виносять в окремий файл, наприклад `actions.ts`.

```tsx
// app/actions.ts
'use server'

export async function submitForm(formData: FormData) {
    const rawFormData = {
        name: formData.get('name'),
        message: formData.get('message'),
    }
    // Логіка...
}
```

---

## ✍️ Практика

### Задача 1: Проста зворотна форма
Створимо просту форму "Напиши мені" у нашому проекті.

**Кроки:**
1. Створи папку `app/contact` та файл `page.tsx`.
2. У цій же папці створи файл `actions.ts`.
3. В `actions.ts` напиши асинхронну функцію `handleContact`, яка приймає `formData`, дістає звідти `message` і виводить його в консоль (просто `console.log`). Не забудь `'use server'`.
4. В `page.tsx` створи форму з одним `textarea` (задай йому `name="message"`) та кнопкою "Відправити".
5. Передай свій екшен у пропс `action` форми.

---

## ⏳ Обробка стану завантаження (useFormStatus)

Для того, щоб користувач розумів, що форма відправляється, використовується хук `useFormStatus`.

### Як він працює?
```tsx
const { pending } = useFormStatus();
```
- `pending: true` — запит іде на сервер.
- `pending: false` — запит завершено.

### Головне правило:
Хук `useFormStatus` має викликатися у компоненті, який знаходиться **всередині** `<form>`. 

**Приклад (правильно):**
```tsx
// 1. Окремий компонент кнопки
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Відправляється...' : 'Надіслати'}
    </button>
  );
}

// 2. Основний компонент форми
export default function Page() {
  return (
    <form action={myAction}>
      <input name="name" />
      <SubmitButton /> 
    </form>
  );
}
```

---

## ✍️ Практика (продовження)

### Задача 2: Додаємо Loading state
Додай стан завантаження до своєї контактної форми.

**Кроки:**
1. Винеси свою кнопку з `ContactForm.tsx` в окремий компонент `SubmitButton.tsx` (можеш створити файл у папці `components`).
2. Використай у цій кнопці хук `useFormStatus`. Не забудь про `'use client'`.
3. Додай затримку у свій `actions.ts`, щоб встигнути побачити напис "Відправляється..." (використай `await new Promise(res => setTimeout(res, 2000))`).

---

## ✅ Перевірка розуміння
1. Де виконується код всередині Server Action (браузер чи сервер)?
2. Чи можна використовувати `'use server'` всередині Client Component?
3. Який об'єкт за замовчуванням отримує Server Action від форми?
4. Чому ми повинні виносити кнопку в окремий компонент для використання `useFormStatus`?
