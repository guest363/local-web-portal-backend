# Модуль monitoringa

## API
Помним что все апи имеют префикс /api

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| ./monitoring/hosts | GET | req.params[0] | false | хосты которые мониторятся |
| ./monitoring/hosts | POST | req.body | true | добавить новый хост для мониторинга |
| ./monitoring/hosts | DELETE | req.body | true | удалить хост |
