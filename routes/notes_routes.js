'use strict';

var bodyparser = require('body-parser');
var Note = require('../models/Note');
var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'foobar123', {dialect: 'postgres'});
//don't try to have one global sql database.. or it will be a giant headache
module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/notes', function(req, res) {
		sql.sync()
		.then(function() {
			Note.all()
			.then(function(data) {
				res.json(data);
			})
			.error(function(err) {
				console.error(err);
				res.status(500).json({msg: 'internal server error'});
			});
		});
	});

	router.get('/notes/:id', function(req, res) {
		sql.sync()
		.then(function() {
			Note.find({
				where: {
				id: req.params.id
				}})
				.then(function(data) {
					res.json(data);
				})
				.error(function(err) {
					console.error(err);
					res.status(500).json({msg: 'internal server error'});
				});
		});
	});

	router.post('/notes', function(req, res) {
		sql.sync()
		.then(function() {
			Note.create(req.body) //var note = new Note won't auto save to db
			.then(function(data) {
				res.json(data);
			})
			.error(function(err) {
				console.error(err);
				res.status(500).json({msg: 'internal server error'});
			});
		});
	});

	router.put('/notes/:id', function(req, res) {
		sql.sync()
		.then(function() {
			Note.find({
				where: {
					id: req.params.id
					}
				})
				.then(function(data) {
					data.destroy().then(function() {});
					Note.create({noteBody: req.body.noteBody, id: req.params.id})
					.then(function(data) {
						res.json({msg: 'ID ' + req.params.id + ' successfully replaced'});
						res.end(data);
					});
				})
				.error(function(err) {
					console.error(err);
					res.status(500).json({msg: 'internal server error'});
				});
		});
	});

	router.delete('/notes/:id', function(req, res) {
		sql.sync()
		.then(function() {
			Note.find({
				where: {
					id: req.params.id
					}
				})
				.then(function(data) {
					data.destroy().then(function() {});
				})
				.then(function(data) {
					res.json({msg: 'Record with ID of ' + req.params.id + ' has been deleted'});
				})
				.error(function(err) {
					console.error(err);
					res.status(500).json({msg: 'internal server error'});
				});
		});
	});
};
