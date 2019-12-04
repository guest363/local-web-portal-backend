# Модуль аутентификации

## API
Помним что все апи имеют префикс /api

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| ./auth/user | POST | req.body | true | создание нового пользователя |
| ./auth/login | POST | req.body | false | аутентификация |

