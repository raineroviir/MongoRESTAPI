'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
	passport.use('basic', new Basic({}, function(email, password, done) {
		User.findOne({'email': email}, function(err, user) {
			if (err) {
				return done('database error');
			}

			if (!user) {
					return done('user does not exist');
			}

			if (!user.checkPassword(password, function(err, res) {
				if (err) {
					console.log(err);
				}
				if(!res) {
					return done('wrong password');
				}
			}));
			return done(null, user);
		});
	}));
};