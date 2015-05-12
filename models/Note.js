'use strict';

var Sql = require('sequelize');
var sql = new Sql('notes_dev','notes_dev','foobar123', {dialect: 'postgres'});

var Note = module.exports = sql.define('Note', {
	noteBody: Sql.STRING
});


Note.sync();
