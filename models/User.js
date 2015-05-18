'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');
var userSchema = mongoose.Schema({
	username: String,
	basic: {
		email: String,
		password: String
	}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret, callback) {
	eat.encode({id: this._id}, secret, callback);
};

userSchema.methods.owns = function(obj) {
	obj.authorId = this._id;
	return obj.authorId;
};

module.exports = mongoose.model('User', userSchema);