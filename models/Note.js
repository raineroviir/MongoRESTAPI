'use strict';

var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  author: String,
  noteBody: String,
  creationDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Note', noteSchema);
