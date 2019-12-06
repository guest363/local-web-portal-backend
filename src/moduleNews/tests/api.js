//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const newsModel = require('../schems/newsModel.js');

//Подключаем dev-dependencies
const chai = require('chai');
const should = chai.should();
const { SOCKET } = require('../../variables');
let token;
const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { NEWS, NEWS2, NEWS_INVALID } = require('./constants');
const { CREATE_NEWS,
    UPDATE_NEWS,
    DELETE_NEWS,
    POST_ERROR,
    DELETE_ERROR,
    SOCKET_ACTION_ERROR,
    AUTH_ERROR } = require('../messages');
//Наш основной блок
describe('Проверка модуля Новостей', () => {
    before(async () => {
        await newsModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });
    describe('Чтение и запись новостей', () => {
        it('В пустой базе нет новостей -> []', async () => {
            SOCKET.emit("news", {
                action: "getAll"
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('RETURN_ALL_NEWS', allNews => {
                    allNews.should.be.a('Array');
                    allNews.should.have.length(0);
                    resolve()
                })
            });
        });

        it('Запись и чтение новости', async () => {
            SOCKET.emit("news", {
                action: "post",
                msg: NEWS,
                token: token
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('RESULT', result => {
                    result.should.be.a('string');
                    result.should.be.eql(CREATE_NEWS);
                    SOCKET.emit("news", {
                        action: "getAll"
                    });
                    SOCKET.once('RETURN_ALL_NEWS', allNews => {
                        allNews.should.be.a('Array');
                        allNews.should.have.length(1);
                        resolve()
                    })
                });
            });
        });

        it('Запись инвалидной новости - событие ERROR', async () => {
            SOCKET.emit("news", {
                action: "post",
                msg: NEWS_INVALID,
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

        it('Запись и удаление новости', async () => {
            SOCKET.emit("news", {
                action: "post",
                msg: NEWS2,
                token: token
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('RESULT', result => {
                    result.should.be.a('string');
                    result.should.be.eql(CREATE_NEWS);
                    SOCKET.emit("news", {
                        action: "getAll"
                    });
                    SOCKET.once('RETURN_ALL_NEWS', allNews => {
                        allNews.should.be.a('Array');
                        allNews.should.have.length(2);
                        SOCKET.emit("news", {
                            action: "delete",
                            msg: allNews[1]['_id'],
                            token: token
                        });
                        SOCKET.once('RESULT', result => {
                            result.should.be.a('string');
                            result.should.be.eql(DELETE_NEWS);
                            resolve();
                        });
                    });
                });
            });
        });


        it('Удаление не существующей новости - событие ERROR', async () => {
            SOCKET.emit("news", {
                action: "delete",
                msg: { '_id': 'NONE EXIST' },
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
            SOCKET.emit("news", {
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
            SOCKET.emit("news", {
                action: "post",
                msg: NEWS2,
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
