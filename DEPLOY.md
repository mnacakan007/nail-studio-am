# Деплой на Firebase Hosting

## Что уже готово

- `firebase.json` — конфиг для хостинга (Vite SPA, rewrites, кэширование статики)
- `.firebaserc` — там нужно вписать ID вашего Firebase-проекта
- `package.json` — добавлены команды `npm run deploy` и `npm run deploy:preview`

## Первый раз (5 минут)

### 1. Установить Firebase CLI (один раз на компьютере)

```
npm install -g firebase-tools
```

### 2. Войти в аккаунт

```
firebase login
```

Откроется браузер — подтвердите вход в тот же Google-аккаунт, где у вас Firebase.

### 3. Указать ваш проект

Откройте файл `.firebaserc` и замените `YOUR-FIREBASE-PROJECT-ID` на реальный ID проекта из Firebase Console.

ID видно:
- в [Firebase Console](https://console.firebase.google.com/) — это то, что в URL `console.firebase.google.com/project/<ID>`
- либо выполните `firebase projects:list` в терминале

Если хостинг для этого проекта ещё не включён — запустите один раз:
```
firebase init hosting
```
и выберите:
- **Use an existing project** → ваш проект
- **Public directory** → `dist`
- **Configure as a single-page app** → `Yes`
- **Set up automatic builds with GitHub** → `No` (если не нужно)
- **Overwrite index.html** → `No` (важно — иначе затрёт наш файл)

### 4. Установить зависимости и задеплоить

```
cd C:\Users\Mno\Desktop\nail-studio-react
npm install
npm run deploy
```

Первая сборка — минуту-две. После деплоя в консоли появится URL вида:
```
Hosting URL: https://your-project-id.web.app
```

## Дальнейшие деплои

После любых правок:
```
npm run deploy
```

## Preview-канал (тестовая ссылка на 7 дней)

Чтобы показать клиенту/себе версию перед отправкой на prod:
```
npm run deploy:preview
```
Firebase вернёт временный URL — основной сайт не тронется.

## Привязка своего домена

В Firebase Console → Hosting → Add custom domain. Дальше Firebase сам даст DNS-записи (A и TXT), которые нужно вставить в панель вашего регистратора. SSL подключается автоматически.

## Что делает деплой под капотом

1. `vite build` — собирает оптимизированный бандл в папку `dist/`:
   - минификация JS/CSS
   - хеширование имён файлов (для кэш-бастинга)
   - обработка картинок из `public/`
2. `firebase deploy --only hosting` — загружает содержимое `dist/` на CDN Firebase:
   - HTML отдаётся с `no-cache` (чтобы новые версии сразу видели пользователи)
   - статика (JS, CSS, картинки) отдаётся с `max-age=1 год, immutable` — быстрая загрузка при повторных визитах

## Если что-то пошло не так

- **"Error: Not in a Firebase app directory"** — вы не в папке проекта. `cd` в неё.
- **"Error: Failed to get Firebase project"** — неправильный ID в `.firebaserc` или нет прав на проект.
- **"Error: HTTP Error: 403"** — нужно заново `firebase login` или у аккаунта нет роли Editor/Owner в проекте.
- **Белая страница после деплоя** — проверьте, что в `firebase.json` поле `public` равно `"dist"`, а rewrites указывает на `/index.html`. У нас всё настроено корректно.
