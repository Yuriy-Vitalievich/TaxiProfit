# TaxiProfit Telegram Mini App

TaxiProfit уже подготовлен как Telegram Mini App: подключен официальный Telegram WebApp SDK, интерфейс подхватывает тему Telegram, разворачивает WebView, показывает инициалы пользователя Telegram и использует нативную кнопку Back.

## Публичная ссылка

Используй HTTPS-адрес GitHub Pages:

```text
https://yuriy-vitalievich.github.io/TaxiProfit/
```

## Настройка в BotFather

1. Открой `@BotFather` в Telegram.
2. Создай бота командой `/newbot`, если его еще нет.
3. Открой `/mybots` и выбери бота TaxiProfit.
4. Перейди в `Bot Settings` -> `Configure Mini App`.
5. Нажми `Enable Mini App`.
6. Вставь URL:

```text
https://yuriy-vitalievich.github.io/TaxiProfit/
```

После этого в профиле бота появится кнопка открытия Mini App.

## Дополнительно

Для прямой ссылки Mini App можно создать приложение через `/newapp` в `@BotFather`. В качестве URL укажи тот же адрес GitHub Pages, а `short_name` выбери короткий латинский, например:

```text
taxiprofit
```

## Что важно

- GitHub Pages подходит, потому что Telegram Mini App требует HTTPS.
- Supabase продолжает хранить и синхронизировать данные.
- Сейчас данные общие для текущего Supabase-проекта. Для пользователей следующим этапом нужно добавить Supabase Auth и привязку записей к Telegram `user.id`.
