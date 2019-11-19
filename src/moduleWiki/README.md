# Модуль википедии

## API
Помним что все апи имеют префикс /api

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| ./wiki/article/NAME | GET | req.params[0] - название статьи | false | статья вики |
| ./wiki/article | POST | req.body | true | запись статьи |
| ./wiki/article | DELETE | req.params[0] | true | удаляет статью |
| ./wiki/article-searche | GET | req.query = {tag: [], content: ''} | false | возвращает статью найденную по тегу и содержанию |
| ./wiki/tag | GET | req.query = {tag: [], content: ''} | false | возвращает все теги |
| ./wiki/tag | POST | req.body | true | заносит новый тег |
| ./wiki/tag | DELETE | req.params[0] | true | удаляет тег |
