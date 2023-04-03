const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, enum: ['on', 'off'], required: true },
});

const Light = mongoose.model('Light', lightSchema);

module.exports = Light;
