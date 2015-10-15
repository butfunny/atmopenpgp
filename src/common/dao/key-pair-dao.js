var mongoose = require('mongoose');

module.exports = mongoose.model('KeyPair', {
    user_id: String,
    created: Boolean,
    passphrase: String
}, "key_pair");