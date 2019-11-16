const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const makePing = require('./makePing');
const { mongoose } = require('./variables.js');
const cors = require('cors')

/* ------------- Пинг узлов в отдельный процесс -------- */
/* Или можно через exex дублировать процесс и выполнять там пинг */
/* const exec = require('child_process').exec; */
/* console.log( makePing); */
/* exec(`node C:\WebPortalBackend\src\makePing.js`); */
makePing().then(res => console.log(res));
setInterval(() => {
  /*   exec(`node C:\WebPortalBackend\src\makePing.js`, (error, stdout, stderr) => {
      console.log(stdout)
      console.log(error)
    }); */
  makePing().then(res => console.log(res));
}, 180000);


/* К сожалению, Express не может самостоятельно обрабатывать формы в URL-кодировке. 
Тут нам на помощь придёт ранее установленный пакет body-parser. */
// ДОЛЖЕН БЫТЬ ПЕРЕД NTML
/* Чтобы парсить запросы с картинками лимит поднят до 5 МБ */
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------------------------------------------------------------
// Точки не требующие аутентификации
// ----==== CORS OF ===-----
app.use(cors());

/* Глобальный обьект где храниться аутентифицирующая информация */
const authData = {};

/* Подключаю все эндпоинты */
require('./routes/routes.js')(app, authData, io);

//-------------- API для работы с БД через Socket --------------
const shoot = require('./expressAPI/shoot');
const usb = require('./expressAPI/usb/usb');


const news = require('./expressAPI/news/news');
//------------------------------------------------

// -------- Настройка сервера -------------

app.set('views', 'views');
app.use(express.static(`/frontend/dist`));

app.get('/', (req, res) => {
  res.sendFile(`/frontend/dist/index.html`);
});
// ----------------------------------------

io.on('connection', socket => {
  socket.on('notification', function (msg) { 
    socket.broadcast.emit('notification', {
      message: msg,
      username: name
    });
  });
  socket.on('usb', (req) => usb(req, socket));
  socket.on('shoot', (req) => shoot(req, socket));
  socket.on('news', (req) => news(req, socket));

});
process.on('SIGINT', function () {
  mongoose.disconnect();
  console.log('Mongoose diconnect!');
  process.exit(0);
});
process.on('SIGTERM', function () {
  mongoose.disconnect();
  console.log('Mongoose diconnect!');
  process.exit(0);
});
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
