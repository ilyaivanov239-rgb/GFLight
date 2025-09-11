# Glare Free Light — Next.js (EN / RU / PT)

Готовый проект: **Next.js + Tailwind + i18n**. По умолчанию открывается английская версия, переключатель RU · EN · PT — в шапке.

## Как запустить локально
```bash
npm i
npm run dev
```
Откройте http://localhost:3000 — будет редирект на `/en`.

## Как загрузить в GitHub
1. Зайдите на github.com → **New repository** → назовите, например, `glarefreelight`.
2. В репозитории нажмите **Upload files**.
3. Перетащите *все файлы проекта* из этой папки.
4. Нажмите **Commit changes**.

## Как подключить к Vercel
1. Зайдите на https://vercel.com → **Add New → Project**.
2. Дайте доступ к вашему GitHub (если спросит).
3. Выберите репозиторий `glarefreelight` → **Import**.
4. Настройки оставить по умолчанию → **Deploy**.
5. Готово: сайт будет доступен по адресу вида `https://glarefreelight.vercel.app`.

## Где править тексты и кнопки
Все тексты лежат в файлах локализации:
- `locales/en.json`
- `locales/ru.json`
- `locales/pt.json`

Правите нужные строки → коммитите в GitHub → Vercel сам обновит сайт.

## Где менять картинки
- Главная (hero) использует `public/og-image.jpg` — замените файл на ваш (желательно 1200×630).
- Фавикон: `public/favicon.ico`.
- Картинки проектов можно складывать в `public/projects/` и подключать их на странице, заменив заглушки в секции `Projects` (компонент в `app/[lang]/page.tsx`).

## SEO
- Заголовок и описание берутся из `meta.title` и `meta.description` в `locales/*.json`.
- OpenGraph и Twitter-карточки уже настроены и используют `public/og-image.jpg`.
- Язык страницы управляется префиксом URL (`/en`, `/ru`, `/pt`).

Если что-то понадобится доработать — пишите.
