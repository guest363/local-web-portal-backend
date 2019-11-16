const { mongoose } = require('../variables.js');
const Schema = mongoose.Schema;
const crypto = require('crypto');
/* Schema */
const userSchema = new Schema({
    displayName: String,
    login: {
        type: String,
        required: 'login обязателен',
        unique: 'такой login уже занят'
    },
    passwordHash: String,
    salt: String,
}, {
        timestamps: true
    });
/* Важно. Чтобы при выдаче можно было обращаться к виртуальным функциям */
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

/* Virual support functions */
userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });
/* Methods */
userSchema.methods.checkPassword = function (password) {
    if (!password || !this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
}
/* Model */
const userModel = mongoose.model('userModel', userSchema, 'user');
module.exports = userModel;