const INCORRECT_DATA = 'Логин или пароль не верны.';
const NOT_OBJECT = `Не корректные данные. Ожидаемый формат {login: "", password: "" ...}`;
const NOT_FULL_DATA = 'Должны быть заданны логин и пароль.';
const ONLY_FOR_AUTH_USER = `Только авторизованные пользователи c ролью администратора могут создать нового пользователя`;
module.exports = {
    INCORRECT_DATA,
    NOT_OBJECT,
    NOT_FULL_DATA,
    ONLY_FOR_AUTH_USER
}