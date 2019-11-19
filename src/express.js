const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const { mongoose } = require('./variables.js');
/* const cors = require('cors') */
const customCors = require('./corsRules');

/* К сожалению, Express не может самостоятельно обрабатывать формы в URL-кодировке. 
Тут нам на помощь придёт ранее установленный пакет body-parser. */

/* Чтобы парсить запросы с картинками лимит поднят до 5 МБ */
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------------------------------------------------------------
// Точки не требующие аутентификации



// ----==== CORS OF ===-----
/* app.use(cors()); */
// ----==== custom CORS OF ===-----
app.use(customCors);

/* Подключаю все REST эндпоинты */
require('./routes/index.js')(app, io);

//-------------- API для работы с БД через Socket --------------
const shoot = require('./moduleShoot/router');
const usb = require('./expressAPI/usb/usb');
const news = require('./expressAPI/news/news');
//------------------------------------------------

// -------- Настройка сервера -------------

app.set('views', 'views');
app.use(express.static(`/WebPortal/frontend/dist`));

app.get('/', (req, res) => {
  res.sendFile(`/WebPortal/frontend/dist/index.html`);
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
const processExit = () => {
  mongoose.disconnect();
  console.log('Mongoose diconnect!');
  process.exit(0);
}
process.on('SIGINT', function () {
  processExit();
});
process.on('SIGTERM', function () {
  processExit();
});
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
