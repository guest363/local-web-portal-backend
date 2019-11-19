# Модуль monitoringa

## API
Помним что все апи имеют префикс /api

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| ./persons/person | GET | req.query.id | false | получить информацию о людях |
| ./persons/person | POST | req.body | true | добавить информацию о человеке |
| ./persons/person | DELETE | req.body | true | удалить информацию о человеке |
