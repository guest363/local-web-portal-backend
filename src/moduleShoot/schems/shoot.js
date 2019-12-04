const { mongoose } = require('../../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const shootSchema = new Schema({
    leson: Number,
    day: {
        type: Date,
        default: Date.now()
    },
    fio: {
        type: String,
        uppercase: true,
        trim: true,
        index: true,
        require: true
    },
    mark: {
        type: Number,
        min: 0,
        max: 5,
        require: true
    },
    sum: {
        type: Number,
        require: true
    },
    values: [Number],
    x: [Number],
    y: [Number]
});
/* Важно. Чтобы при выдаче можно было обращаться к виртуальным */
shootSchema.set('toObject', { virtuals: true });
shootSchema.set('toJSON', { virtuals: true });
/* Querys */
shootSchema.query.byFIOandDate = function (fio, startDate, endDate) {
    startDate = (!startDate) ? new Date(2011) : startDate;
    endDate = (!endDate) ? new Date : endDate;
    return this.where({
        'fio': new RegExp(fio, 'i'),
        'day': {
            $gte: startDate,
            $lte: endDate
        }
    })
};
/* Virual support functions */
shootSchema.virtual('shootsCoords').get(function () {
    const shootsCoords = this.x.map((x, index) => {
        return [x, this.y[index]];
    });
    return shootsCoords;
});
/* Model */
let shootModel = mongoose.model('shootModel', shootSchema, 'shoot');
module.exports = shootModel;