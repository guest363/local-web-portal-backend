
/** @description регулярное выражение для поиска подстроки
 */
/* const findReceived = /Received = \d/; */
const findReceived = /����祭� = \d/; // Для плохой кодировки русского

/** @description Анализирует STDOUT пинга вычленяя колличество удачных пингов
 * @param error 
 * @param stdout вывод от ping
 * @param stderr
 * @returns булевое значение включен ли компьютер и даже в случае ошибки анализа
 *          вернет false
 */
const strAnalize = stdout => {
    let received, isOn = false;
    try {
        received = findReceived.exec(stdout)[0];
        isOn = (/\d/.exec(received)[0] > 0) ? true : false;
    } catch (error) {
        console.log(`Ping ERROR = ${error}`)
    }
    return isOn;
};

module.exports = strAnalize;

