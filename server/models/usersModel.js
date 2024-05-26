const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});


userSchema.plugin(mongoosePaginate)

const User = mongoose.model("user", userSchema);

module.exports = User;