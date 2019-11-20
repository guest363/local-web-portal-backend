# Модуль мониторинга USB
По сокетам работает с клиентом и по HTTP с тонкими клиентами
## API клиентов
Работает через веб сокеты

| Socket event        | Params | Request Auth | Result |
| :----------  | :----- | :----------- | :----- |
| usb | {chunk: Number, filter: String, action: 'get', table: TABLE } | false | получить отсортированную таблицу или кусок таблицы TABLE|
| usb  | {action: 'addToWhite', token: '' }| true | добавить устройство в белый список |
| usb  |  { action: 'del', table: TABLE, token: '' } | true | удалить устройство из таблицы TABLE |
| usb  | {action: 'update',  token: '' } | false | обновить сведения об устройстве во всех таблицах |


## API тонкого клиента
Работает через HTTP

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| ./mountflash | POST | req.params[0] | false | информация о вставке и извлечения USB|

