const { mongoose } = require('../../variables.js');
const Schema = mongoose.Schema;
const crypto = require('crypto');
/* Schema */
const userSchema = new Schema({
    displayName: String,
    login: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    role: {
        type: String,
        enum: ['user', 'ib', 'liader', 'admin']
    },
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
};
userSchema.methods.checkRole = function (reqRole) {
    if (reqRole === this.role) return true;
    return false;
};
/* Model */
const userModel = mongoose.model('userModel', userSchema, 'user');
module.exports = userModel;