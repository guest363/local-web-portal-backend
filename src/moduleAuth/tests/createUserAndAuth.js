const SERVER = require('../../express.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const {USER, USER2} = require('./constants.js');

/**
 * Создает нового пользователя неавторизованным пользователем, т.е. без токена 
 * @param {Object} user - пользователь для создания
 * @returns {Object} ответ сервера
 */
const createValidUser_NoAuth = async (user) => {
    return await chai.request(SERVER)
        .post('/api/auth/user')
        .send(user);
};
/**
 * Создает пользователя с помощью авторизованного токена
 * @param {Object} user - пользователь для создания
 * @param {string} token - токен
 * @returns {Object} ответ сервера
 */
const createValidUser_Auth = async (user, token) => {
    return await chai.request(SERVER)
        .post('/api/auth/user')
        .set('token', token)
        .send(user);
};
/**
 * Создает пользователя и авторизуется им 
 * @returns {Object} userJWT - токен
 */
const createUserAndAuth = async () => {
   await createValidUser_NoAuth(USER);
    const login = await chai.request(SERVER)
        .post('/api/auth/login')
        .send(USER);
    let result;
    try {
        result = JSON.parse(login.text);

    } catch (error) {
        console.log(error)
    }
    return result;
};

module.exports = {
    createUserAndAuth,
    createValidUser_NoAuth,
    createValidUser_Auth
}