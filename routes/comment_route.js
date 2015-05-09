var Comment = require('../models/Comment');
var bodyparser = require('body-parser');

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/comments', function(req, res) {
		Comment.find({}, function(err, data) {
					if (err) {
			console.log(err);
			return res.status(500).json({msg: 'internal server error'});
		}

		res.json(data);
		});
	});

	router.get('/comments/:id', function(req, res) {
		Comment.find({'_id': req.params.id}, function(err, data) {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}

			res.json(data);
		});
	});

	router.post('/comments', function(req, res) {
		var newComment = new Comment(req.body);
		newComment.save(function(err, data) {
			if (err) {
				console.log(err);
				return (err.name)?  res.status(500).json({msg: err.name}) : res.status(500).json({msg: 'internal server error ' });
			}

			res.json(data);
		});
	});

	router.put('/comments/:id', function(req, res) {
		var updatedComment = req.body;
		delete updatedComment._id;

		Comment.update({'_id': req.params.id}, updatedComment, function(err, data) {
			if (err) {
				console.log(err);
				return (err.name)?  res.status(500).json({msg: err.name}) : res.status(500).json({msg: 'internal server error ' });
			}

			res.json({msg: req.params.id + ' has been updated!'});
		});
	});

	router.delete('/comments/:id', function(req, res) {
		Comment.remove({'_id': req.params.id}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}

			res.json({msg: req.params.id + ' has been deleted!'});
		});
	});
};

//superagent localhost:3000/api/comments
//post works with mongo + mongod running
//get works, returns all the comments
