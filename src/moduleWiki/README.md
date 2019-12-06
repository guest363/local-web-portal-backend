# Модуль википедии
Локальное хранилище знаний.


## API
Действия по изменению статей происходит по wiki.url а не по ['_id'] - url уникальное поле.
Если попытаться обновить статью командой POST то операция будет выполнена корректно, но лучше использовать PUT на url.

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| /api/wiki/articles | GET |   | false | все статьи |
| /api/wiki/articles/:url | GET |  req.params.url  | false | статья |
| /api/wiki/articles | POST |  req.body | true | запись статьи |
| /api/wiki/articles/:url | PUT |  req.body | true | обновление статьи |
| /api/wiki/articles/:url | DELETE | req.params.url | true | удаляет статью |
| /api/wiki/article-searche | GET | req.query = {tag: [], content: ''} | false | возвращает статью найденную по тегу и содержанию |
| /api/wiki/tag | GET | req.query = {tag: [], content: ''} | false | возвращает все теги |
| /api/wiki/tag | POST | req.body | true | заносит новый тег |
| /api/wiki/tag | DELETE | req.params[0] | true | удаляет тег |
