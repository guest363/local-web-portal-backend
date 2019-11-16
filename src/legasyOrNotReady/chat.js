const { Mongo, MongoUrl } = require('../variables.js');

function chat(msg, socket, io, name) {
  io.emit('messageToClients', {
    message: msg,
    author: name
  }); // Отправляем всем сокетам событие 'messageToClients' и отправляем туда же два аргумента (текст, имя юзера)
  Mongo.connect(MongoUrl, function (err, client) { // запись сообщения в БД
    const db = client.db('Tyumen'); // подключится к БД messageArchive
    const collection = db.collection('messageArchive'); // использовать коллекцию archive
    // P.S. Сделать новую базу и ограничить для ее коллекции размер, не как сейчас
    // в целях улучшения читаемости человеком. Хоть сами по себе коллекции не связаны!  
    collection.save({
      "message": msg,
      "name": name
    });
    client.close();
  });
};
module.exports = chat;