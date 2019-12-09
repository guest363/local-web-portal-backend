# Модуль стрельб
Хранит данные со стрельб.

## API
Работает через веб сокеты

| Socket event        | Params | Request Auth | Result |
| :----------  | :----- | :----------- | :----- |
| shoot | { action: "get",  msg: query } query = {fio: '', startDate: '', endDate: '' } | false | получить историю стрельб|
| shoot  | { action: "set", msg: shooter, token: '' } | true | добавить результаты стрельбы |
| shoot  |  { action: "delete", msg: id, token: '' } | true | удалить результаты стрельбы |

## Формат данных 
    leson: Number,
    day: {
        type: Date,
        default: Date.now()
    },
    fio: {
        type: String,
        uppercase: true,
        trim: true,
        index: true,
        required: true
    },
    mark: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    values: [Number],
    x: [Number],
    y: [Number]