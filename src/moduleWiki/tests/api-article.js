//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const wikiModel = require('../schems/wikiModel.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);

const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { WIKI, WIKI2, WIKI_INVALID } = require('./constants');
const URL = `/api/wiki/articles`;

const { CREATE_WIKI,
    UPDATE_WIKI,
    DELETE_WIKI,
    POST_ERROR,
    DELETE_ERROR,
    SEARCHE_ERROR,
    COUNT_ERROR,
    GET_ERROR,
    AUTH_ERROR } = require('../messages');
let token;
//Наш основной блок
describe('Проверка модуля Википедии - работа со статьями', () => {
    before(async () => {
        await wikiModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });

    describe('Чтение и запись', () => {

        it('Занести без авторизации нельзя', async () => {
            const wikiPostedResult = await chai.request(server)
                .post(`${URL}`)
                .send(WIKI);
            wikiPostedResult.should.have.status(200);
            wikiPostedResult.text.should.be.a('string');
            wikiPostedResult.text.should.have.string(AUTH_ERROR);

        });

        it('Занести c авторизации', async () => {
            const wikiPostedResult = await chai.request(server)
                .post(`${URL}`)
                .set('authorization', `Bearer ${token}`)
                .send(WIKI);
            wikiPostedResult.should.have.status(200);
            wikiPostedResult.text.should.be.a('string');
            wikiPostedResult.text.should.have.string(CREATE_WIKI);
        });
        it('Занести не корректную статью c авторизации - ошибка', async () => {
            const wikiPostedResult = await chai.request(server)
                .post(`${URL}`)
                .set('authorization', `Bearer ${token}`)
                .send(WIKI_INVALID);
            wikiPostedResult.should.have.status(200);
            wikiPostedResult.text.should.be.a('string');
            wikiPostedResult.text.should.have.string(POST_ERROR);
        });
        it('Получить все статьи', async () => {
            let wikiGetResult = await chai.request(server)
                .get(`${URL}`);
            wikiGetResult.should.have.status(200);
            try {
                wikiGetResult = JSON.parse(wikiGetResult.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            wikiGetResult.should.be.a('array');
            wikiGetResult.should.have.length(1);
        });
        it('Получить конкретную статью', async () => {
            let wikiGetResult = await chai.request(server)
                .get(`${URL}\\${WIKI.url}`);
            wikiGetResult.should.have.status(200);
            try {
                wikiGetResult = JSON.parse(wikiGetResult.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            wikiGetResult.should.be.a('object');
            wikiGetResult.should.have.property('content');
        });
        it('Удалить статью', async () => {
            const wikiDeleteResult = await chai.request(server)
                .delete(`${URL}\\${WIKI.url}`)
                .set('authorization', `Bearer ${token}`);
            wikiDeleteResult.should.have.status(200);
            wikiDeleteResult.text.should.be.a('string');
            wikiDeleteResult.text.should.have.string(DELETE_WIKI);
        });
    });

});
