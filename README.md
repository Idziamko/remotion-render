# Remotion Cloud Renderer

Рендер Remotion `.tsx` → `.mp4` через GitHub Actions. Без терминала, без локальной установки.

## Как пользоваться

### 1. Положить свой код

Открой файл `src/Video.tsx` на гитхабе → нажми иконку карандаша (Edit) → замени весь код на свой → кнопка **Commit changes** внизу страницы.

### 2. Дождаться рендера

После коммита автоматически запустится workflow. Следи в разделе **Actions** (вкладка сверху репо). Обычно ~2–5 минут.

### 3. Скачать mp4

Когда job станет зелёной галочкой — открой её, промотай вниз, в разделе **Artifacts** будет `video` (.zip c .mp4 внутри). Кликаешь → скачивается.

---

## Ручной запуск с кастомным именем

Если хочешь указать своё имя файла:

1. Вкладка **Actions** → слева выбери **Render Video**
2. Кнопка справа **Run workflow**
3. В поле `filename` вбей имя (без `.mp4`) → **Run workflow**
4. Ждёшь → качаешь артефакт с этим именем

---

## Что должно быть в `Video.tsx`

```tsx
import React from 'react';
import { AbsoluteFill } from 'remotion';

// Опциональные настройки композиции
// Если не указать — дефолт 1920×1080, 30 fps, 5 секунд
export const compositionConfig = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInSeconds: 5, // или durationInFrames: 150
};

export default function MyVideo() {
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* твой контент */}
    </AbsoluteFill>
  );
}
```

Требования:
- **`export default`** React-компонента (обязательно)
- **`export const compositionConfig`** (опционально) — имена `config`, `videoConfig`, `remotionConfig` тоже принимаются

---

## Что уже доступно

Предустановлены пакеты из экосистемы Remotion:
- `remotion` — ядро
- `@remotion/google-fonts` — Google шрифты
- `@remotion/lottie` — Lottie анимации
- `@remotion/shapes` — фигуры
- `@remotion/paths` — SVG пути
- `@remotion/media-utils` — утилиты для аудио/видео
- `@remotion/transitions` — переходы

Если нужен ещё пакет (например `framer-motion`, `@remotion/skia`), добавь его в `package.json` → commit → всё автоматически.

---

## Лимиты GitHub Actions

- **Публичный репо:** безлимит
- **Приватный репо:** 2000 минут/месяц бесплатно

Один 5-секундный рендер ~2–3 минуты. Обычно хватает с запасом.
