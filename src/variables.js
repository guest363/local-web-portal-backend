const Mongo = require('mongodb').MongoClient;
// mongo а не localhost так как docker 
/* Note: The reason for this is because docker will add an entry to your /etc/hosts 
file that point the service name / link name to the private IP address of the linked container. */
const HOST_OR_CONTAINER_NAME = 'localhost';
const DB_ROOT_NAME = 'Tyumen';
const DB_PORT = `27017`;
/* const MongoUrl = `mongodb://${HOST_OR_CONTAINER_NAME}:${DB_PORT}`; */
const MONGOOSE_URL = `mongodb://${HOST_OR_CONTAINER_NAME}:${DB_PORT}/${DB_ROOT_NAME}`;

const mongoose = require('mongoose');
const jwtsecret = `vjfdskoghf#fD$%fd@21"{V_`;
mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

module.exports.mongoose = mongoose;
module.exports.jwtsecret = jwtsecret;