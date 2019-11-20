# Модуль новостей
При добавлении или удалении новости актуальный список новостей пересылается всем клиентам.
## API
Работает через веб сокеты

| Socket event        | Params | Request Auth | Result |
| :----------  | :----- | :----------- | :----- |
| news | { action: "get",  msg: id } | false | получить новость|
| news  | { action: "post", msg: news, token: '' } | true | добавить новость |
| news  |  { action: "delete", msg: id, token: '' } | true | удалить новость |
| news  |  { action: "getAll"} | false | получить все новости |
