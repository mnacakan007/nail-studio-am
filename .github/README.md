# GitHub Actions → Firebase Hosting

Два workflow настроены:

- **`firebase-deploy.yml`** — при push в `main` автоматически собирает проект и выкатывает на production.
- **`firebase-preview.yml`** — при создании Pull Request собирает preview-версию и комментирует в PR ссылку (живёт 7 дней).

## Что нужно сделать один раз

### 1. Создать Service Account в Firebase

Самый простой способ — через Firebase CLI, она сама создаст аккаунт и добавит секрет в GitHub:

```
cd C:\Users\Mno\Desktop\nail-studio-react
firebase init hosting:github
```

Отвечайте на вопросы:
- **Which GitHub repository?** → `mnacakan007/nail-studio-am`
- **Set up workflow to deploy on merge?** → `No` (у нас свои workflow, не надо их перезаписывать)
- **Set up workflow to deploy on PR?** → `No`

CLI сама:
- создаст service account в Google Cloud,
- положит приватный ключ в GitHub Secrets под именем `FIREBASE_SERVICE_ACCOUNT_NAIL_STUDIO_AM`.

### 2. Переименовать секрет (или подправить workflow)

Firebase CLI обычно именует секрет в стиле `FIREBASE_SERVICE_ACCOUNT_<PROJECT_ID>` (верхний регистр, дефисы → подчёркивания). У нас в workflow-файлах секрет зовётся просто `FIREBASE_SERVICE_ACCOUNT`.

Выберите одно из двух:

**A. Переименовать секрет в GitHub** (проще):
- GitHub → Settings → Secrets and variables → Actions
- Удалите старый секрет, создайте новый с тем же значением под именем `FIREBASE_SERVICE_ACCOUNT`.

**B. Поменять имя в workflow**: в файлах `firebase-deploy.yml` и `firebase-preview.yml` замените `FIREBASE_SERVICE_ACCOUNT` на то имя, которое сгенерировала CLI (например, `FIREBASE_SERVICE_ACCOUNT_NAIL_STUDIO_AM`).

### 3. Пушните и проверьте

```
git add .
git commit -m "Set up Firebase deploy workflows"
git push
```

GitHub → вкладка **Actions** → увидите запущенный workflow. Через пару минут сайт будет на https://nail-studio-am.web.app

## Ручной деплой (если нужен)

Из локальной машины всё равно работает:
```
npm run deploy
```

## Как поменять имя ветки

Если у вас не `main`, а `master` — замените в `firebase-deploy.yml`:
```yaml
branches:
  - master
```
