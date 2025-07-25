# Astro Portfolio Starter

## Быстрый старт

```bash
# 1. Установите зависимости (нужен Node.js ≥ 18)
npm install

# 2. Запустите проект в режиме разработки
npm run dev
```

Откройте `http://localhost:4321` — увидите пример портфолио.

## Как добавить новый проект

1. Создайте папку с изображениями: `public/images/my-project/`.
2. Скопируйте любую фотографию в качестве обложки (`cover`).
3. В `src/content/projects/` создайте файл `my-project.md`:

```md
---
title: "My Project"
cover: "/images/my-project/cover.jpg"
gallery:
  - "/images/my-project/cover.jpg"
  - "/images/my-project/second.jpg"
---

Короткое описание проекта.
```

4. Фотографии перечислите в массиве `gallery`.
5. Сохраните файл — Astro перегенерирует сайт, новая карточка появится на главной.

## Деплой на Netlify

1. Создайте репозиторий на GitHub и запушьте код.
2. На Netlify нажмите **“Add new site → Import from Git”** и выберите репозиторий.
3. Build Command: `npm run build`  
   Publish Directory: `dist`
4. По желанию подключите свой домен.

### Netlify CMS

Зайдите на `/admin` после деплоя. При первом входе Netlify попросит включить Identity и Git Gateway.
Через CMS можно добавлять проекты без редактирования кода.

