//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const pingModel = require('../schems/pingModel.js');

//Подключаем dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);

const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { HOST, HOST2, HOST_INVALID } = require('./constants');
const URL = `/api/monitoring/hosts`;

const { CREATE_HOST,
    UPDATE_HOST,
    DELETE_HOST,
    POST_ERROR,
    DELETE_ERROR,
    AUTH_ERROR } = require('../messages');
let token;
//Наш основной блок
describe('Проверка модуля Мониторин', () => {
    before(async () => {
        await pingModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });
    
    describe('Чтение и запись новых хостов', () => {
        it('Получить хосты из пустой базы', async () => {
            const hosts = await chai.request(server)
                .get(URL)
            hosts.should.have.status(200);
            hosts.text.should.be.a('string');
            hosts.text.should.be.equal(`[]`);
        });

        it('Занести без авторизации нельзя', async () => {
            const hostPostedResult = await chai.request(server)
                .post(URL)
                .send(HOST);
            hostPostedResult.should.have.status(200);
            hostPostedResult.text.should.be.a('string');
            hostPostedResult.text.should.have.string(AUTH_ERROR);

        });
        it('Занести хост дважды с авторизацией', async () => {
            const hostPostedResult = await chai.request(server)
                .post(URL)
                .set('authorization', `Bearer ${token}`)
                .send(HOST);
            hostPostedResult.should.have.status(200);
            hostPostedResult.text.should.be.a('string');
            hostPostedResult.text.should.have.string(CREATE_HOST);
            const hostPostedResult_Update = await chai.request(server)
                .post(URL)
                .set('authorization', `Bearer ${token}`)
                .send(HOST);
            hostPostedResult_Update.should.have.status(200);
            hostPostedResult_Update.text.should.be.a('string');
            hostPostedResult_Update.text.should.have.string(UPDATE_HOST);
        });

        it('Получить хосты из не пустой базы', async () => {
            let hosts = await chai.request(server)
                .get(URL);
            try {
                hosts = JSON.parse(hosts.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            hosts.should.be.a('array');
            hosts.should.be.have.length(1);
        });

        it('Удалить без авторизации нельзя', async () => {
            const hosts = await chai.request(server)
                .delete(URL)
                .send(HOST.ip);
            hosts.should.have.status(200);
            hosts.text.should.be.a('string');
            hosts.text.should.have.string(AUTH_ERROR);
        });

        it('Удалить не существующий хост нельзя', async () => {
            const hosts = await chai.request(server)
                .delete(URL)
                .set('authorization', `Bearer ${token}`)
                .send({ ip: '006' });
            hosts.should.have.status(200);
            hosts.text.should.be.a('string');
            hosts.text.should.have.string(DELETE_ERROR);
        });

        it('Удалить хост из базы', async () => {
            const hosts = await chai.request(server)
                .delete(URL)
                .set('authorization', `Bearer ${token}`)
                .send(HOST);
            hosts.should.have.status(200);
            hosts.text.should.be.a('string');
            hosts.text.should.have.string(DELETE_HOST);
        }); 
    });  
});
