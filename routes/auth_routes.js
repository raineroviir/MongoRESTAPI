'use strict';

var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var User = require('../models/User');
var bodyparser = require('body-parser');
var uuid = require('uuid');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.get('/user/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function (err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'error generating token'});
      }
      res.json({email: req.user.email, username: req.user.username, token: token});
    });
  });

  router.post('/user/create_user', function(req, res) {
    var newUserData = JSON.parse(JSON.stringify(req.body));
    var newUser = new User(newUserData);
    createNewUser();
    function createNewUser() {

    delete newUserData.email;
    delete newUserData.password;
    newUser.email = req.body.email;
    newUser.userType = newUserData.userType || 'local';
    newUser.uniqueHash = uuid.v4();
    newUser.generateHash(req.body.password, 8, function (err, hash) {
      if (err) {
        console.log(err);
      }

      newUser.password = hash;
      saveUserAsync();
    });
		}

    var saveUserAsync = function() {
    newUser.save(function(err, user) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'could not create user'});
      }

      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }

        res.json({email: newUser.email, username: newUser.username, token: token});
      });
    });
    };
  });
};