'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'changethisCHANGETHIS!';

var commentRoute = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/comment_development');

app.use(passport.initialize());

require('./routes/comment_route')(commentRoute);
require('./lib/passport_strategy')(passport);
require('./routes/auth_routes')(usersRoutes, passport);

app.use('/api', commentRoute);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function(port) {
	console.log('server is running now at ' + (process.env.PORT || 3000));
});