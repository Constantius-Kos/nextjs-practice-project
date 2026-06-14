# Резюме уроку 22: Оптимізація шрифтів

У цьому уроці ми навчилися працювати зі шрифтами в Next.js 16/17, використовуючи сучасні методи оптимізації та інтеграцію з Tailwind CSS v4.

## Основні тези:
- **Zero Layout Shift (CLS)**: Завдяки `next/font`, браузер знає розміри шрифту ще до завантаження, що запобігає "стрибкам" контенту.
- **Self-hosting**: Next.js автоматично завантажує Google шрифти під час build-time і віддає їх з вашого домену.
- **Tailwind v4 Integration**: Використання CSS-змінних у директиві `@theme` для створення власних класів `font-*`.
- **Local Fonts**: Підключення нестандартних шрифтів через `next/font/local`.

## Що зроблено в практиці:
1. Підключено **Montserrat** як основний sans-serif шрифт.
2. Додано акцентний шрифт **Unbounded** для виділення окремих елементів (блоги).
3. Реалізовано локальне підключення шрифту **Insula.ttf** для футера/хедера.
4. Налаштовано підтримку кирилиці для всіх шрифтів.

## Корисні посилання:
- [Next.js Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Unbounded on Google Fonts](https://fonts.google.com/specimen/Unbounded)
