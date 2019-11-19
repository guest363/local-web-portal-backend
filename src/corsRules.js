const allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next()
  }
}

module.exports = allowCORS;

