const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: String,
  username: String,
  email: String,
  photo: String,
  friendsList: [String],
  eventIds: [String]
})

module.exports = mongoose.model('User', userSchema);


