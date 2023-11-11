const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose); // Nie trzeba dodawać osobno username ani password do usera bo robi to za nas .plugin

module.exports = mongoose.model('User', UserSchema);