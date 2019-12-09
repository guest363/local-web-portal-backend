//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const alertModel = require('../schems/alertModel');
const mountModel = require('../schems/mountModel');
const whiteModel = require('../schems/whiteModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);
const { USB, USB2, USB_INVALID } = require('./constants');
const URL = `/mountflash`;
const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { SOCKET } = require('../../variables');
const { CREATE_WHITE,
    CREATE_ALERT,
    CREATE_ERROR,
    DELETE_USB,
    DELETE_ERROR,
    GET_ERROR,
    UPDATE_ERROR,
    UPDATE_USB,
    AUTH_ERROR } = require('../messages');
let token;
describe('Проверка модуля Контроля USB - server api', () => {
    before(async () => {
        await alertModel.deleteMany({});
        await mountModel.deleteMany({});
        await whiteModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });
    describe('Чтение и запись', () => {
        it('Прочесть таблицу алертов - пусто', async () => {
            SOCKET.emit("usb", {
                action: "get",
                table: 'alertUSB'
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('alertUSB', result => {
                    (result.chunk[0]) ? reject() : resolve();
                });
            });
        });
        it('Занести 2 записи', async () => {
            await chai.request(server).post(`${URL}`).send(USB);
            return await chai.request(server).post(`${URL}`).send(USB2);
        });
        it('Прочесть таблицу алертов - 2 записи', async () => {
            SOCKET.emit("usb", {
                action: "get",
                table: 'alertUSB'
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('alertUSB', result => {
                    result.chunk.should.be.a('array');
                    result.chunk.should.have.length(2);
                    resolve();
                });
            });
        });
        it('Прочесть таблицу примонтированных устр - 2 записи', async () => {
            SOCKET.emit("usb", {
                action: "get",
                table: 'mountUSB'
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('mountUSB', result => {
                    result.chunk.should.be.a('array');
                    result.chunk.should.have.length(2);
                    resolve();
                });
            });
        });
        it('Добавить USB 1 в белый список', async () => {
            SOCKET.emit("usb", {
                action: "get",
                table: 'alertUSB'
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('alertUSB', result => {
                    SOCKET.emit("usb", {
                        action: "addToWhite",
                        token: token,
                        table: 'whiteListUSB',
                        msg: result.chunk[0]
                    });
                    SOCKET.once('ERROR', error => reject(error));
                    SOCKET.once('RESULT', result => {
                        result.should.be.a('string');
                        result.should.have.string(CREATE_WHITE);
                        resolve();
                    });
                });
            });
        });
        it('Добавить не корректуню запись в белый список - ошибка', async () => {
            SOCKET.emit("usb", {
                action: "addToWhite",
                token: token,
                table: 'whiteListUSB',
                msg: USB_INVALID
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => {
                    error.should.be.a('string');
                    error.should.have.string(CREATE_ERROR);
                    resolve();
                });
            });
        });
        it('Удалить 1 USB из списка примонтированных', async () => {
            SOCKET.emit("usb", {
                action: "get",
                table: 'mountUSB'
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('ERROR', error => reject(error));
                SOCKET.once('mountUSB', result => {
                    SOCKET.emit("usb", {
                        action: "del",
                        token: token,
                        table: 'mountUSB',
                        msg: result.chunk[0]['_id']
                    });

                    SOCKET.once('ERROR', error => reject(error));
                    SOCKET.once('RESULT', result => {
                        result.should.be.a('string');
                        result.should.have.string(DELETE_USB);
                        resolve();
                    });
                });
            });
        });
        it('Обновить данные носителя', async () => {
            const USB_NEW = USB;
            USB_NEW.USBnameSave = USB_NEW.serial;
            USB_NEW.serial = `---=== Новое имя ===---!`;
            SOCKET.emit("usb", {
                action: "update",
                token: token,
                table: 'all',
                msg: USB_NEW
            });

            return new Promise((resolve, reject) => {
                SOCKET.once('RESULT', result => {
                    result.should.be.a('string');
                    result.should.have.string(UPDATE_USB);
                    resolve();
                });
            });
        });
    });
});
