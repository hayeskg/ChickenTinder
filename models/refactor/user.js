const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  eventId: String,
  name: String,
  email: String,
  password: String,
  city: String
})

module.exports = mongoose.model('User', userSchema);