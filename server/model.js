const { Schema } = require('mongoose');

const userSchema = new Schema({
  identifier: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  active: {
    type: Boolean,
    index: true,
    required: true,
    default: true,
  },
});

module.exports = { userSchema };
