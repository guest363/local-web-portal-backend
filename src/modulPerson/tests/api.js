//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const personModel = require('../schems/personModel.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);

const { createUserAndAuth } = require('../../moduleAuth/tests/createUserAndAuth');
const { PERSON, PERSON2, PERSON_INVALID } = require('./constants');
const URL = `/api/persons/person`;

const { CREATE_PERSON,
    UPDATE_PERSON,
    DELETE_PERSON,
    POST_ERROR,
    DELETE_ERROR,
    AUTH_ERROR } = require('../messages');
let token;
//Наш основной блок
describe('Проверка модуля Личного состава', () => {
    before(async () => {
        await personModel.deleteMany({});
        const login = await createUserAndAuth();
        token = login.userJWT;
    });

    describe('Чтение и запись', () => {

        it('Занести без авторизации нельзя', async () => {
            const personPostedResult = await chai.request(server)
                .post(URL)
                .send(PERSON);
            personPostedResult.should.have.status(200);
            personPostedResult.text.should.be.a('string');
            personPostedResult.text.should.have.string(AUTH_ERROR);

        });
        it('Занести двух человек с авторизацией', async () => {
            const personPostedResult = await chai.request(server)
                .post(URL)
                .set('authorization', `Bearer ${token}`)
                .send(PERSON);
            personPostedResult.should.have.status(200);
            personPostedResult.text.should.be.a('string');
            personPostedResult.text.should.have.string(CREATE_PERSON);
            const personPostedResult2 = await chai.request(server)
                .post(URL)
                .set('authorization', `Bearer ${token}`)
                .send(PERSON2);
            personPostedResult2.should.have.status(200);
            personPostedResult2.text.should.be.a('string');
            personPostedResult2.text.should.have.string(CREATE_PERSON);
        });

        it('Изменить данные человека - правильный ответ', async () => {
            let allPerson = await chai.request(server)
                .get(`${URL}?id=all`);

            try {
                allPerson = JSON.parse(allPerson.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            const updatePerson = { ...allPerson[0], birthDay: new Date()};
            const personPostedResult = await chai.request(server)
                .post(URL)
                .set('authorization', `Bearer ${token}`)
                .send(updatePerson);
            personPostedResult.should.have.status(200);
            personPostedResult.text.should.be.a('string');
            personPostedResult.text.should.have.string(UPDATE_PERSON);
        });

        it('Занесение в неправильном формате - ошибка', async () => {
            const personPostedResult = await chai.request(server)
                .post(URL)
                .set('authorization', `Bearer ${token}`)
                .send(PERSON_INVALID);
            personPostedResult.should.have.status(200);
            personPostedResult.text.should.be.a('string');
            personPostedResult.text.should.have.string(POST_ERROR);
        });

        it('Получить список всех людей из не пустой базы', async () => {
            const allPerson = await chai.request(server)
                .get(`${URL}?id=all`);
            allPerson.should.have.status(200);
            allPerson.text.should.be.a('string');
            allPerson.text.should.have.string('fio');
        });

        it('Удалить без авторизации нельзя', async () => {
            const person = await chai.request(server)
                .delete(`${URL}?id=sdwd`);
            person.should.have.status(200);
            person.text.should.be.a('string');
            person.text.should.have.string(AUTH_ERROR);
        });

        it('Удалить не существующего человека нельзя', async () => {
            const person = await chai.request(server)
                .delete(`${URL}?id=006`)
                .set('authorization', `Bearer ${token}`);
            person.should.have.status(200);
            person.text.should.be.a('string');
            person.text.should.have.string(DELETE_ERROR);
        });

        it('Удалить человека из базы', async () => {
            let allPerson = await chai.request(server)
                .get(`${URL}?id=all`);

            try {
                allPerson = JSON.parse(allPerson.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            allPerson.should.be.a('array');
            allPerson.should.have.length(2);
            const deleteResult = await chai.request(server)
                .delete(`${URL}?id=${allPerson[0]['_id']}`)
                .set('authorization', `Bearer ${token}`);
            deleteResult.should.have.status(200);
            deleteResult.text.should.be.a('string');
            deleteResult.text.should.have.string(DELETE_PERSON);

            let allPersonNew = await chai.request(server)
                .get(`${URL}?id=all`);

            try {
                allPersonNew = JSON.parse(allPersonNew.text);
            } catch (error) {
                console.error(`Ошибка парсинга JSON - ${error}`)
            }
            allPersonNew.should.be.a('array');
            allPersonNew.should.have.length(1);
        });

    });

});
