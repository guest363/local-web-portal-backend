const { mongoose } = require('../../variables');
const Schema = mongoose.Schema;
/* Schema */
const pingSchema = new Schema({
    ip: {
        type: String,
        index: true
    },
    name: {
        type: String
    },
    online: {
        type: Boolean
    },
    isControling: {
        type: Boolean,
        default: true
    },
    hostType: {
        type: String
    },
    addDate: {
        type: Date,
        default: Date.now()
    }
});

/* Model */
let pingModel = mongoose.model('ping', pingSchema, 'pingHosts');
module.exports = pingModel;