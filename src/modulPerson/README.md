# Модуль person
Для хранения списка сотруднико организации.
Нужнен для занесения результатов стрельб, спорта и так далее.

## API

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| /api/persons/person | GET | req.query.id | false | получить информацию о людях |
| /api/persons/person | POST | req.body | true | добавить информацию о человеке |
| /api/persons/person | DELETE | req.query.id | true | удалить информацию о человеке |
