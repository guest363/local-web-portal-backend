    let stream = '';
    const sendMessageArchive = function () {
      collection = db.collection('messageArchive');
      stream = collection.find().stream(); // потоково читаем вывод, это функция Node js
      // A stream is an abstract interface for working with streaming data in Node.js. 
      // The stream module provides a base API that makes it easy to build objects that implement the stream interface.
      stream.on('data', history => { //The 'data' event is emitted whenever the stream is relinquishing ownership of a chunk of data to a consumer. 
        // Т.е. реагирует на появление данных в потоке
        let {
          message,
          name
        } = history; // деструктуризация, т.к. есть лишние поля
        socket.emit('messageToClients', {
          'message': message,
          'author': name
        });
      }); // Передача событию messageToClients и отдаем как обычное сообщение 
    }();