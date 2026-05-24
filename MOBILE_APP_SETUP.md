# TaxiProfit Mobile App Setup

TaxiProfit теперь можно использовать как installable PWA и подготовить к упаковке в полноценное приложение через Capacitor.

## Быстрый вариант: PWA

### Android

1. Открой публичную ссылку TaxiProfit в Chrome.
2. Нажми меню браузера.
3. Выбери `Установить приложение` или `Добавить на главный экран`.
4. На телефоне появится отдельная иконка TaxiProfit.

### iPhone

1. Открой публичную ссылку TaxiProfit в Safari.
2. Нажми кнопку `Поделиться`.
3. Выбери `На экран Домой`.
4. Подтверди добавление.

PWA работает из текущего кода, обновляется через GitHub Pages и не требует App Store.

## Полноценное приложение через Capacitor

Capacitor упаковывает текущий веб-интерфейс в мобильный контейнер.

### Подготовка

```bash
npm install
npm run cap:add:android
npm run cap:add:ios
npm run cap:sync
```

### Android

```bash
npm run cap:open:android
```

Дальше сборка APK/AAB делается в Android Studio.

### iOS

```bash
npm run cap:open:ios
```

Дальше сборка делается в Xcode. Для установки на iPhone понадобится Apple Developer account, TestFlight или App Store.

## Авторизация

Для полноценного приложения лучше уйти от Telegram ID и сделать отдельный вход через Supabase Auth:

- email magic link;
- телефон + OTP;
- Google/Apple login.

После входа приложение показывает onboarding только если у пользователя еще нет завершенного профиля водителя.
