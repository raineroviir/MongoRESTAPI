'use strict';

var mongoose = require('mongoose');
var express = require('express');

var app = express();
var commentRoute = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/comment_development');

require('./routes/comment_route')(commentRoute);

app.use('/api', commentRoute);

app.listen(process.env.PORT || 3000, function(port) {
	console.log('server is running now at ' + (process.env.PORT || 3000));
});