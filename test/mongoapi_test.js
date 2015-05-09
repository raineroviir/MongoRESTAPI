'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/comment_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

var Comment = require('../models/Comment');

describe('my mongo REST API', function () {

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('GET all comments', function(done) {
		chai.request('localhost:3000')
		.get('/api/comments')
		.end(function(err, res) {
			expect(typeof res.body).to.eql('object');
			expect(Array.isArray(res.body)).to.be.eql(true);
			done();
		});
	});

	it('POST new comment', function(done) {
		chai.request('localhost:3000')
		.post('/api/comments')
		.send({author: "rainer", commentBody: 'test comment(POST)'})
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.commentBody).to.eql('test comment(POST)');
			expect(res.body).to.have.property('_id');
			done();
		});
	});
});

describe('needs an existing note to work with', function() {

	beforeEach(function(done) {
		var testComment = new Comment({author: "rainer", commentBody: 'test comment(PUT)'});
		testComment.save(function(err, data) {
			if (err) throw err;

			this.testComment = data;
			done();
		}.bind(this));
	});

	it('should be able to make a comment in a beforeEach block', function() {
		expect(this.testComment.commentBody).to.eql('test comment(PUT)');
		expect(this.testComment).to.have.property('_id');
	});

	it('should update a comment', function(done) {
		var update_id = this.testComment._id;
		chai.request('localhost:3000')
		.put('/api/comments/' + this.testComment._id)
		.send({author: "me", commentBody: 'here is a new comment'})
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.msg).to.eql(update_id + ' has been updated!');
			done();
		});
	});

	it('should delete a comment', function(done) {
		var del_id = this.testComment._id;
		chai.request('localhost:3000')
		.del('/api/comments/' + this.testComment._id)
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.msg).to.eql(del_id + ' has been deleted!');
			done();
		});
	});

});
