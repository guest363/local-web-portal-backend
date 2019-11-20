# Модуль стрельб

## API
Работает через веб сокеты

| Socket event        | Params | Request Auth | Result |
| :----------  | :----- | :----------- | :----- |
| shoot | { action: "get",  msg: query } query = {fio: '', startDate: '', endDate: '' } | false | получить историю стрельб|
| shoot  | { action: "set", msg: shooter, token: '' } | true | добавить результаты стрельбы |
| shoot  |  { action: "delete", msg: id, token: '' } | true | удалить результаты стрельбы |
