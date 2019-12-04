//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const auth = require('../schems/auth.js');
const { INCORRECT_DATA, NOT_OBJECT, NOT_FULL_DATA, ONLY_FOR_AUTH_USER } = require('../errorMsg.js');
//Подключаем dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../express.js');
const should = chai.should();

chai.use(chaiHttp);
const { createUserAndAuth, createValidUser_NoAuth, createValidUser_Auth } = require('./createUserAndAuth');
const { USER, USER2 } = require('./constants.js');



describe('Проверка модуля Аутентификации', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        auth.deleteMany({}, (err) => {
            done();
        });
    });

    describe('Аутентификация в пустой базе', () => {
        it('Пользователей нет', async () => {
            const login = await chai.request(server)
                .post('/api/auth/login')
                .send(USER);
            login.should.have.status(200);
            login.text.should.be.a('string');
            login.text.should.be.eql(INCORRECT_DATA);
        });
        it('Передан не правильный обьект', async () => {
            const login = await chai.request(server)
                .post('/api/auth/login')
                .send(new Date());
            login.should.have.status(200);
            login.text.should.be.a('string');
            login.text.should.be.eql(NOT_FULL_DATA);
        });
        it('Передан не обьект', async () => {
            const login = await chai.request(server)
                .post('/api/auth/login')
                .send('login - test, passorw - test');
            login.should.have.status(200);
            login.text.should.be.a('string');
            login.text.should.be.eql(NOT_FULL_DATA);
        });
        it('Передан не обьект 2', async () => {
            const login = await chai.request(server)
                .post('/api/auth/login')
                .send(void 0);
            login.should.have.status(200);
            login.text.should.be.a('string');
            login.text.should.be.eql(NOT_FULL_DATA);
        });
    });

    /* Без передачи done тесты становятся синхронными? */
    describe('Создание пользователей', () => {
        it('Создать пользователя в пустой базе', async () => {
            const res = await createValidUser_NoAuth(USER);
            res.should.have.status(200);
            res.text.should.be.a('string');
            res.text.should.be.eql('Создан новый пользователь admin');
            return;
        });
        it('Создать 2-х пользователей без авторизации нельзя', async () => {
            const res = await createValidUser_NoAuth(USER);
            res.should.have.status(200);
            res.text.should.be.a('string');
            res.text.should.be.eql('Создан новый пользователь admin');

            const invalidUser = await createValidUser_NoAuth(USER);
            invalidUser.should.have.status(200);
            invalidUser.text.should.be.a('string');
            invalidUser.text.should.be.eql(ONLY_FOR_AUTH_USER);
            return;
        });
        it('Должен войти под новым пользователем и создать еще одного пользователя', async () => {
            const login = await createUserAndAuth();

            login.should.be.a('object');
            login.should.have.property('userJWT');

            const res = await createValidUser_Auth(USER2, login.userJWT)
            res.should.have.status(200);
            res.text.should.be.a('string');
            res.text.should.be.eql('Создан новый пользователь admin2');
            return;
        });
    });
    
    after((done) => {
        auth.deleteMany({}, (err) => {
            done();
        });
    });
});
