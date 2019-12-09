//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const alertModel = require('../schems/alertModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);

const { USB, USB2, USB_INVALID } = require('./constants');
const URL = `/mountflash`;

describe('Проверка модуля Контроля USB - tiny clients api', () => {
    before(async () => {
        await alertModel.deleteMany({});
    });

    describe('Чтение и запись', () => {
        it('Занести 2 корректные записи', async () => {
            const usbPostedResult = await chai.request(server)
                .post(`${URL}`)
                .send(USB);
            usbPostedResult.should.have.status(200);
            usbPostedResult.text.should.be.a('string');
            usbPostedResult.text.should.have.string('false');
            const usbPostedResult2 = await chai.request(server)
                .post(`${URL}`)
                .send(USB2);
            usbPostedResult2.should.have.status(200);
            usbPostedResult2.text.should.be.a('string');
            usbPostedResult2.text.should.have.string('false');
        });
        it('Занести не корректную запись - ошибка в консоль', async () => {
            const usbPostedResult = await chai.request(server)
                .post(`${URL}`)
                .send(USB_INVALID);
            usbPostedResult.should.have.status(200);
            usbPostedResult.text.should.be.a('string');
            usbPostedResult.text.should.have.string('true');
            /* Так как устройства без серийного номера не заносястся в базу
            сразу отправляется true */
        });
    });
});
