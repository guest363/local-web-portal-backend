//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const shootModel = require('../schems/shoot');

//Подключаем dev-dependencies
const chai = require('chai');
const should = chai.should();
const { SOCKET } = require('../../variables');
let token;
const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { SHOOT, SHOOT2, SHOOT_INVALID } = require('./constants');
const { CREATE_SHOOT,
    DELETE_SHOOT,
    POST_ERROR,
    DELETE_ERROR,
    SOCKET_ACTION_ERROR,
    AUTH_ERROR } = require('../messages');
//Наш основной блок
describe('Проверка модуля cтрельб', () => {
    before(async () => {
        await shootModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });
    describe('Чтение и запись результатов стрельб', () => {

        it('Запись и чтение результатов стрельбы', async () => {
            SOCKET.emit("shoot", {
                action: "set",
                msg: SHOOT,
                token: token
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('RESULT', result => {
                    result.should.be.a('string');
                    result.should.be.eql(CREATE_SHOOT);
                    SOCKET.emit("shoot", {
                        action: "get",
                        msg: SHOOT
                    });
                    SOCKET.once('SHOOT_HISTORY', history => {
                        history.should.be.a('Array');
                        history.should.have.length(1);
                        resolve()
                    })
                });
            });
        });

        it('Запись некорректных результатов - событие ERROR', async () => {
            SOCKET.emit("shoot", {
                action: "set",
                msg: SHOOT_INVALID,
                token: token
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => {
                    error.should.be.a('string');
                    error.should.be.have.string(POST_ERROR);
                    resolve()
                });
            });
        });

        it('Запись и удаление результатов стрельбы', async () => {
            SOCKET.emit("shoot", {
                action: "set",
                msg: SHOOT2,
                token: token
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('RESULT', result => {
                    result.should.be.a('string');
                    result.should.be.eql(CREATE_SHOOT);
                    SOCKET.emit("shoot", {
                        action: "get",
                        msg: SHOOT2
                    });
                    SOCKET.once('SHOOT_HISTORY', history => {
                        history.should.be.a('Array');
                        history.should.have.length(1);
                        SOCKET.emit("shoot", {
                            action: "delete",
                            msg: history[0].id,
                            token: token
                        });
                        SOCKET.once('RESULT', result => {
                            result.should.be.a('string');
                            result.should.be.eql(DELETE_SHOOT);
                            resolve();
                        });
                    });
                });
            });
        });


        it('Удаление не существующих данных - событие ERROR', async () => {
            SOCKET.emit("shoot", {
                action: "delete",
                msg: { 'id': 'NONE EXIST' },
                token: token
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => {
                    error.should.be.a('string');
                    error.should.be.have.string(DELETE_ERROR);
                    resolve()
                });
            });
        });

        it('Вызов несуществующего ивента сокета - событие ERROR ', () => {
            SOCKET.emit("shoot", {
                action: "NONE_EXIST_ACTION"
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => {
                    error.should.be.a('string');
                    error.should.be.eql(SOCKET_ACTION_ERROR);
                    resolve();
                });
            });
        });

        it('Попытка записи без авторизации - событие ERROR', () => {
            SOCKET.emit("shoot", {
                action: "set",
                msg: SHOOT2,
                token: 'NONE_EXIST_TOKEN'
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => {
                    error.should.be.a('string');
                    error.should.be.eql(AUTH_ERROR);
                    resolve();
                });
            });
        });
    });
});
