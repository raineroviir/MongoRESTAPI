'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/comment_testing';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

var Comment = require('../models/Comment');
var User = require('../models/User');

describe('my mongo REST API', function () {

	var testToken = '';
	before(function(done) {
    chai.request('localhost:3000')
      .post('/api/user/create_user')
      .send({email: 'user3@test.com', username: 'testUser3', password: 'foobar'})
      .end(function(err, res) {
        testToken = res.body.token;
        expect(err).to.eql(null);
        expect(res.body.username).to.eql('testUser3');
        expect(res.body.token.length).to.eql(96);
        expect(res.status).to.eql(200);
        done();
     });
  });

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

	// it('POST new comment', function(done) {
	// 	chai.request('localhost:3000')
	// 	.post('/api/comments')
	// 	.send({author: "rainer", commentBody: 'test comment(POST)'})
	// 	.end(function(err, res) {
	// 		expect(err).to.eql(null);
	// 		expect(res.body.commentBody).to.eql('test comment(POST)');
	// 		expect(res.body).to.have.property('_id');
	// 		done();
	// 	});
	// });
});
