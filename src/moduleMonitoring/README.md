# Модуль monitoring
Для мониторинга устройств локальной сети средствами нативного пинга Windows

## API

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| /api/monitoring/hosts | GET | req.params[0] | false | хосты которые мониторятся |
| /api/monitoring/hosts | POST | req.body | true | добавить новый хост для мониторинга |
| /api/monitoring/hosts | DELETE |  req.body.ip | true | удалить хост |
