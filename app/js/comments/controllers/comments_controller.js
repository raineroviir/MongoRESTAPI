'use strict';

module.exports = function(app) {
  app.controller('commentsController', ['$scope', '$http', function($scope, $http) {
    $scope.errors = [];
    $scope.comments = [];

    $scope.getAll = function() {
      $http.get('/api/comments')
        .success(function(data) {
          $scope.comments = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error retrieving comments'});
        });
    };

    $scope.createnewComment = function() {
      $http.post('/api/comments', $scope.newComment)
        .success(function(data) {
          $scope.comments.push(data);
          $scope.newComment = null; 
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not create new comment'});
        });
    };

    $scope.removeComment = function(comment) {
      $scope.comments.splice($scope.comments.indexOf(comment), 1);
      $http.delete('/api/comments/' + comment._id)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not remove comment: ' + comment.commentBody});
        });
    };

    $scope.saveComment = function(comment) {
      comment.editing = false;
      $http.put('/api/comments/' + comment._id, comment)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not update comment'});
        });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
