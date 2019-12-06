const Mongo = require('mongodb').MongoClient;
// mongo а не localhost так как docker 
/* Note: The reason for this is because docker will add an entry to your /etc/hosts 
file that point the service name / link name to the private IP address of the linked container. */
const HOST_OR_CONTAINER_NAME = 'localhost';
const DB_ROOT_NAME = 'Tyumen';
const DB_PORT = `27017`;

const MONGOOSE_URL_WORK = `mongodb://${HOST_OR_CONTAINER_NAME}:${DB_PORT}/${DB_ROOT_NAME}`;
const MONGOOSE_URL_TEST = `mongodb://${HOST_OR_CONTAINER_NAME}:${DB_PORT}/Testing`;
const MONGOOSE_URL = process.env.NODE_ENV.trim() === 'test' ? MONGOOSE_URL_TEST : MONGOOSE_URL_WORK;

const mongoose = require('mongoose');
const jwtsecret = `vjfdskoghf#fD$%fd@21"{V_`;
mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const io = require('socket.io-client');
const FULL_ADDR_TESTS = `${HOST_OR_CONTAINER_NAME}:3001`;
const URL_TESTS = `http://${FULL_ADDR_TESTS}`;
const SOCKET = io(URL_TESTS);

module.exports.SOCKET = SOCKET;
module.exports.mongoose = mongoose;
module.exports.jwtsecret = jwtsecret;