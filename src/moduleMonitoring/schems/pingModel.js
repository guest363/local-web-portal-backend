const { mongoose } = require('../../variables');
const Schema = mongoose.Schema;
/* Schema */
const pingSchema = new Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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