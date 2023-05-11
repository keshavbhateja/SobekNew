const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

var GSchema = new Schema({
  googleId: String,
  displayName: String
});

  
User.plugin(passportLocalMongoose);
mongoose.model('users', GSchema);
  
module.exports = mongoose.model('User', User)

