const Mongo = require('mongodb').MongoClient;
// mongo а не localhost так как docker 
/* Note: The reason for this is because docker will add an entry to your /etc/hosts 
file that point the service name / link name to the private IP address of the linked container. */
const hostAndContaineName = 'mongo';
const dbRootName = 'Tyumen';
const dbPort = `27777`;
const MongoUrl = `mongodb://${hostAndContaineName}:${dbPort}`;
const MongooseUrl = `mongodb://${hostAndContaineName}:${dbPort}/${dbRootName}`;
const mongoose = require('mongoose');
const jwtsecret = `vjfdskoghf#fD$%fd@21"{V_`;
mongoose.connect(MongooseUrl, { useNewUrlParsel: true, useFindAndModify: false });
module.exports.Mongo = Mongo;
module.exports.MongoUrl = MongoUrl;
module.exports.mongoose = mongoose;
module.exports.jwtsecret = jwtsecret;