'use strict';

require('../server');

var bodyparser = require('body-parser');
var Note = require('../models/Note');
var Sql = require('sequelize');
var sql = new Sql('notes_test', 'notes_test', 'foobar123', {dialect: 'postgres'});

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('my Sequelize REST API', function () {

	it('POST new note', function(done) {
		chai.request('localhost:3000')
		.post('/api/notes')
		.send({author: "rainer", noteBody: 'test note(POST)'})
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.noteBody).to.eql('test note(POST)');
			expect(res.body).to.have.property('id');
			done();
		});
	});	

});

describe('get note', function(done) {

	it('GET all notes', function(done) {
		chai.request('localhost:3000')
		.get('/api/notes')
		.end(function(err, res) {
			expect(typeof res.body).to.eql('object');
			expect(Array.isArray(res.body)).to.be.eql(true);
			done();
		});
	});

});

describe('update and delete a note', function(done) {

	beforeEach(function(done) {
		chai.request('localhost:3000')
		.post('/api/notes')
		.send({author: "rainer", noteBody: 'test note(POST)'})
		.end(function(err, res) {
			done();
		});
	});

	it('should update a note', function(done) {
		var testNote = 1;
		chai.request('localhost:3000')
		.put('/api/notes/' + testNote)
		.send({author: "me", noteBody: 'update note'})
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.msg).to.eql('ID ' + testNote + ' successfully replaced');
			done();
		});
	});

	it('should delete a note', function(done) {
		var testNote = 2;
		chai.request('localhost:3000')
		.del('/api/notes/' + testNote)
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.msg).to.eql('Record with ID of ' + testNote + ' has been deleted');
			done();
		});
	});

	after(function(done) {
		Note.drop();
		done();
	});
});