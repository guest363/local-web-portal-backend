//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const tagModel = require('../schems/tagModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);

const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { TAG, TAG2, TAG_INVALID } = require('./constants');
const URL = `/api/wiki/tag`;

const { GET_TAG_ERROR,
    POST_TAG,
    POST_TAG_ERROR,
    POST_TAG_ERROR_HAVE,
    GET_ERROR,
    DELETE_TAG,
    DELETE_TAG_ERROR,
    DELETE_TAG_ERROR_NULL,
    AUTH_ERROR } = require('../messages');
let token;
//Наш основной блок
describe('Проверка модуля Википедии - работа с тегами', () => {
    before(async () => {
        await tagModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });

    describe('Чтение и запись', () => {

        it('Занести без авторизации нельзя', async () => {
            const tagPostedResult = await chai.request(server)
                .post(`${URL}`)
                .send(TAG);
            tagPostedResult.should.have.status(200);
            tagPostedResult.text.should.be.a('string');
            tagPostedResult.text.should.have.string(AUTH_ERROR);
        });


        it('Занести c авторизации', async () => {
            const tagPostedResult = await chai.request(server)
                .post(`${URL}`)
                .set('authorization', `Bearer ${token}`)
                .send(TAG);
            tagPostedResult.should.have.status(200);
            tagPostedResult.text.should.be.a('string');
            tagPostedResult.text.should.have.string(POST_TAG);
        });
        it('Занести не корректный тег c авторизации - ошибка', async () => {
            const tagPostedResult = await chai.request(server)
                .post(`${URL}`)
                .set('authorization', `Bearer ${token}`)
                .send(TAG_INVALID);
            tagPostedResult.should.have.status(200);
            tagPostedResult.text.should.be.a('string');
            tagPostedResult.text.should.have.string(POST_TAG_ERROR);
        });

        it('Повтороное занесение тега - ошибка', async () => {
            const tagPostedResult = await chai.request(server)
                .post(`${URL}`)
                .set('authorization', `Bearer ${token}`)
                .send(TAG);
            tagPostedResult.should.have.status(200);
            tagPostedResult.text.should.be.a('string');
            tagPostedResult.text.should.have.string(POST_TAG_ERROR_HAVE);
        });

        it('Получить все теги', async () => {
            let tagPostedResult = await chai.request(server)
                .get(`${URL}`);
            tagPostedResult.should.have.status(200);
            try {
                tagPostedResult = JSON.parse(tagPostedResult.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            tagPostedResult.should.be.a('array');
            tagPostedResult.should.have.length(1);
        });
        it('Удалить тег', async () => {
            const tagPostedResult = await chai.request(server)
                .delete(`${URL}\\${TAG.tag}`)
                .set('authorization', `Bearer ${token}`);
            tagPostedResult.should.have.status(200);
            tagPostedResult.text.should.be.a('string');
            tagPostedResult.text.should.have.string(DELETE_TAG);
        });
        it('Удалить тег которого нет - ошибка', async () => {
            const tagPostedResult = await chai.request(server)
                .delete(`${URL}\\${TAG.tag}`)
                .set('authorization', `Bearer ${token}`);
            tagPostedResult.should.have.status(200);
            tagPostedResult.text.should.be.a('string');
            tagPostedResult.text.should.have.string(DELETE_TAG_ERROR_NULL);
        });
    });
});
