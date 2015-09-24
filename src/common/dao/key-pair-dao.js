var mongoose = require('mongoose');

module.exports = mongoose.model('KeyPair', {
    user_id: String,
    publicKey: String,
    privateKey: String,
    passphrase: String
}, "key_pair");