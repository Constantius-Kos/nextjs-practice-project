# 🚀 Project Backlog: Interactive Lab Portfolio

Цей файл — твій мікро-навігатор. Виконав крок? Став `[x]`.

---

## 🎯 NOW: The Terminal Hero (Крок 4.1)
*Мета: Реалізувати головний екран з ефектом термінала та коммітами з GitHub.*

### Layer 1: Skeleton (Скелет)
- [x] Створити папку `components/lab` та файл `Terminal.tsx`.
- [x] Створити Server Action або Server Component для отримання даних з GitHub API.
- [x] Написати базову HTML-структуру терміналу (Window bar + Output area).

### Layer 2: Muscles (Логіка)
- [x] Обробити дані GitHub (фільтрація останніх 5 коммітів).
- [x] Реалізувати компонент `TypewriterEffect` для імітації друку коду.
- [x] Додати обробку станів "Loading" та "Error" (базово реалізовано).

### Layer 3: Polish (Краса)
- [x] **3.1. Glass & Glow**: 
    - Додати багатошарову тінь `shadow-gold-amber/20` для ефекту зовнішнього світіння.
    - Налаштувати `backdrop-blur-md` та градієнтний фон для кращого Glassmorphism.
- [x] **3.2. Typography**: 
    - Активувати `font-jetBrains-mono` для всього вмісту терміналу.
    - Додати `text-shadow` (glow effect) для тексту через кастомний утиліт-клас.
- [x] **3.3. VFX (Visual Effects)**:
    - Налаштувати анімацію курсора (зробити його "дихаючим").
    - Додати легкий ефект "скануючих ліній" (опціонально для ефекту CRT).
- [ ] **3.4. Refinement**:
    - [x] Створити `MobileHeader.tsx` з анімованою кнопкою-бургером.
    - [x] Впровадити `MobileHeader` в `layout.tsx` для мобільних екранів.
    - [x] Налаштувати адаптивний рендеринг у `page.tsx`:
        - [x] Мобільний вигляд (перемикання вкладок `profile`, `terminal`, `logs`, `projects`).
        - [x] Десктопний вигляд (3-секційна сітка у Grid: Profile, Terminal+Logs, Projects Hub).
    - [x] Оптимізувати семантику HTML5: винести `<main>` у `layout.tsx` з `flex-1 min-h-0`.
    - [x] Фікс мобільної адресної строки у `MobileHeader.tsx` через патерн якорів `fixed top-16 bottom-4`.
    - [x] Додати плавність появи для кожного компонента (`animate-fade-in`).

---

## 🎯 NOW: Access Logs / Guestbook (Крок 4.2)
*Мета: Реалізувати систему повідомлень з використанням Server Actions та Optimistic UI.*

### Layer 1: Skeleton (БД та Структура)
- [x] Оновити `prisma/schema.prisma` (додати модель `Log` з полями: id, name, message, createdAt).
- [x] Виконати `npx prisma db push` для синхронізації з MongoDB.
- [x] Створити компонент `components/lab/AccessLogs.tsx` та [x] `LogForm.tsx`.

### Layer 2: Muscles (Логіка та Actions)
- [x] Написати Server Action для додавання нового запису в БД.
- [x] Реалізувати отримання списку логів (Server Component) з сортуванням за часом.
- [x] Налаштувати валідацію форми (мінімальна довжина повідомлення).

### Layer 3: Polish (UX та Оптимізація)
- [x] Впровадити `useOptimistic` (щоб повідомлення з'являлося в списку ще до відповіді сервера).
- [x] Застосувати стилістику "Laboratory Entry" (моноширинний шрифт, затухання старих логів).
- [x] Додати `revalidatePath`, щоб дані оновлювались скрізь.

---

## 🎯 NOW: Pulse Dashboard (Крок 4.3)
*Мета: Реалізувати інтерактивний блок, який відображає твій поточний статус із бази даних.*

### Layer 1: Skeleton (Структура)
- [x] Створити компонент `components/lab/PulseDashboard.tsx` (перейменовано зі `Status.tsx`).
- [x] Додати повноцінний Хедер (Header) для десктопу / адаптувати існуючий для виведення статусу.
- [x] Відобразити статус у Хедері сайту (над основними панелями).
- [x] Розв'язати проблему клієнт-серверної межі для мобільного хедера (застосувати патерн Slot Composition для передачі `statusSlot` та `loginSlot`).
- [x] Створити серверний контейнер-обгортку `LoginButtonContainer.tsx` для отримання сесії та збереження роботи Partial Prerendering без помилок збірки.
- [x] Додати запит до моделі `Status` в БД з використанням `'use cache'` та `cacheTag('status')`.

### Layer 2: Muscles (Логіка за Варіантом В — Спеціальний тип стану в БД)
- [x] **2.1. Оновлення схеми бази даних (Prisma):** Додати поле `type` (або `indicator`) у модель `Status` в `prisma/schema.prisma` із дефолтним значенням (наприклад, `"online"` або `"offline"`). Виконати `npx prisma db push`.
- [x] **2.2. Кешування Next.js 16:** Реалізувати збереження в кеш `status` з тегом `cacheTag('status')` і нескінченним життєвим циклом (revalidate/update відбуватиметься примусово при збереженні admin форми).
- [x] **2.3. Локаніка вибору кольору LED-маячка (Варіант В):**
  * Зчитувати значення поля `type` з бази даних (`"online"` | `"busy"` | `"offline"`).
  * Зіставити стани:
    * `"online"` -> Зелений LED (`bg-emerald-500`, швидка пульсація).
    * `"busy"` -> Помаранчевий LED (`bg-amber-500`, повільна пульсація).
    * `"offline"` -> Червоний LED (`bg-red-500`, надповільна пульсація).
- [ ] ~~**2.4. Локалізація часу:**~~ *(Відкладено в Icebox)*
 
### Layer 3: Polish (UX та Стиль)
- [x] Додати ефект пульсуючого індикатора (LED-вогник) з анімацією відповідно до типу стану.
- [x] Оформити блок у стилі "Telemetry Panel" (капсула з ефектом Glassmorphism `bg-black/40 backdrop-blur-md` та світінням `shadow-[0_0_15px_-5px_var(--gold-deep)]`).
- [ ] ~~Приховати невикористані елементи інтерфейсу...~~ *(Відкладено в Icebox)*

### Layer 4: Status History & Telemetry Popover (Крок 4.3.X — Завершено ✅)
- [x] **4.3.1. DB Mutation & Query History:** Переведено `updateStatus` на `db.status.create(...)` для збереження історії та `getStatus` на `orderBy: { updatedAt: 'desc' }`.
- [x] **4.3.2. Status History Fetcher (`getStatusHistory.ts`):** Створено серверний модуль завантаження 10 останніх статусів з кешуванням Next.js 16 (`'use cache'`, `cacheTag('status')`) та обробкою помилок.
- [x] **4.3.4. Component Refactoring & Composition:** Розділено `PulseDashboard.tsx` на чистий оркестратор, `StatusBadge.tsx`, `StatusPlusPopoverWrapper.tsx` та `StatusHistoryList.tsx`.
- [x] **4.3.5. Mobile Stacking Context Fix:** Виправлено `z-index` та порядок шарів у `MobileHeader.tsx` для правильного відображення випадаючого вікна історії над нижніми блоками.
- [ ] **4.3.6. Popover Polish & UX:** Доробити фінальну Cyber Log стилізацію списку логів статусу та додати обробники закриття (`ClickOutside`/`Esc`).

---

## 🎯 NOW: Admin Panel & Root Console (Крок 5)
*Мета: Реалізувати захищений інтерфейс керування лабораторією для авторизованого адміна.*

### Layer 1: Access & Setup (Доступ)
- [x] **5.1. Route & Guard:** Доступ залишається відкритим для всіх, але дії (наприклад, видалення) обмежено тільки для адміністратора.
- [x] **5.2. Terminal Easter Egg:** Реалізовано перехід до адмінки (поки для всіх) через клік на червоний кружечок у терміналі.
- [x] **5.3. Exit Console Link:** Реалізовано вихід з консолі кліком по логотипу в хедері сайту.

### Layer 2: Telemetry Control (Панель Статусу)
- [x] **5.4. Status Action:** Створити Server Action для запису оновленого статусу в БД з викликом `updateTag('status')`.
- [x] **5.5. Status Switcher Form:** Створити форму `components/admin/StatusForm.tsx` (клієнтська форма керування статусом).
- [ ] **5.8. StatusForm Error Handling:** Реалізувати обробку результату виконання `updateStatus` (помилки/успіх) та відображення повідомлень (Toast/State) в `components/admin/StatusForm.tsx`.
- [x] **5.6. Suspense Fix (Build Error):** Огорнути логіку використання динамічних `searchParams` на сторінці адмінки (`page.tsx`) у дочірній компонент та `<Suspense>`.

### Layer 3: Moderation (Модерація логів)
- [x] **5.6. Purge Action:** Створити Server Action `deleteLog` для видалення запису з гостьової книги за ID з оновленням кешу через `updateTag('logs')`.
- [x] **5.7. Log Moderation UI:** Створити компонент `AccessLogModerator.tsx` з Cyber Grid таблицею (4 колонки) та кнопками швидкої модерації `[DELETE]`. (Реалізовано в `AccessLogTable.tsx` з функціональним видаленням та toast-сповіщеннями).

---

## 🎯 NOW: DevProfile & DevInfo Widget (Крок 6)
*Мета: Реалізувати картку профілю з анімованим перемиканням стеку технологій та освіти.*

### Layer 1: Skeleton & Structure
- [x] Створити `DevProfile.tsx` та `DevInfo.tsx` з перемикачем вкладок (`Stack` / `Education`).
- [x] Створити файл `app/data/labData.ts` з типізованими даними `STACK_DATA` та `EDUCATION_DATA`.

### Layer 2: Muscles & Animations
- [x] Налаштувати напрямки анімації (слайд вліво/вправо через `slideRight` і `slideLeft` keyframes).
- [x] Забезпечити ре-маунтинг за допомогою `key={infoPage}` для спрацювання анімації входу.
- [x] Створити компоненти `StackList.tsx` та `EducationList.tsx`.

### Layer 3: Polish & Styling
- [x] Додати підсвітку ключових технологій (`highlight: true`) з ефектом світіння `text-glow`.
- [x] Оформити список вищої освіти (дипломи Магістра та Бакалавра) англійською мовою.
- [x] Налаштувати адаптивну типографіку та кастомний скроллбар `scrollbar-custom`.


---

## 🎯 NOW: Projects Hub & Dynamic Route Architecture (Крок 7)
*Мета: Реалізувати візуальну сітку проєктів із переходом на динамічні сторінки `projects/[slug]`.*

### Layer 1: Data & Types Architecture
- [x] **7.1. Shared Types:** Створити централізований інтерфейс `Project` у `types/shared.ts`.
- [x] **7.2. Projects Data:** Створити `app/data/projectsData.ts` з типізованим масивом `PROJECTS_DATA` та відносними шляхами до WebP-зображень.

### Layer 2: UI & Icon Grid Component
- [x] **7.3. ProjectIcon Component:** Створити компонент `components/lab/ProjectIcon.tsx` з підтримкою `next/image` та пропсів.
- [x] **7.4. Cyber FX & Glow Styling:** Налаштувати ефекти тіней та світіння через CSS-фільтри (`filter-[...]`) з підтримкою золотистого ореолу та вирівнюванням контуру.
- [x] **7.5. Grid Layout Integration:** Впровадити мапінг проєктів у 5-колонкову сітку (`grid grid-cols-5 content-start`) в `app/(public)/page.tsx`.

### Layer 3: Dynamic Project Pages *(Відкладено)*
- [ ] ~~**7.6. Dynamic Route `[slug]`:** Створити структуру `app/(public)/projects/[slug]/page.tsx` для кожної сторінки проєкту.~~ *(Відкладено)*
- [ ] ~~**7.7. Static Params Optimization:** Реалізувати `generateStaticParams()` для SSG-генерації сторінок проєктів під час збірки.~~ *(Відкладено)*

---

## 📅 NEXT
- [x] **Auth Integration**: Додати можливість авторизації (вхід/вихід через провайдери GitHub/Google) — *інтегровано в Header клієнтську модалку та Server Actions*.


---

## ❄️ Icebox (Ідеї на майбутнє)
- [ ] **З Кроку 4.3 (Pulse Dashboard):** Локалізація часу оновлення статусу українською.
- [ ] **З Кроку 4.3 (Pulse Dashboard):** Адаптивне приховування синхронізованої дати на дуже малих екранах.
- [ ] Звуковий супровід друку на клавіатурі.
- [ ] Можливість вводити команди в термінал (інтерактивна консоль).
- [ ] Ефект "старого CRT-монітора" (скануючі лінії).


