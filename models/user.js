const mongoose = require('mongoose');
const passportMongoose  = require('passport-local-mongoose');

const userSchema =  new mongoose.Schema({
    username: String,
    passport: String,
})

userSchema.plugin(passportMongoose);

module.exports = mongoose.model("User", userSchema);