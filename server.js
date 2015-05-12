'use strict';

var express = require('express');
var app = express();
var notesRouter = express.Router();

require('./routes/notes_routes')(notesRouter);

app.use('/api', notesRouter);

app.listen(process.env.PORT || 3000, function(port) {
	console.log('server is running now at ' + (process.env.PORT || 3000));
});