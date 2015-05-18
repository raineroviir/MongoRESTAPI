'use strict';

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	author: { type: String, required: true, minlength: 2, maxlength: 20},
	about_the_author: {
		school: String,
		age: Number
	},
	commentBody: { type: String, required: true, minlength: 10, maxlength: 140},
	creationDate: { type: Date, default: Date.now }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = exports = Comment;

Comment.schema.path('author').validate(function (value) {
	return /bob|rainer|arthur/i.test(value);
}, 'Invalid author name');
