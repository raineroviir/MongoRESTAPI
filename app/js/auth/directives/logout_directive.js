'use strict';

module.exports = function(app) {
  app.directive('logoutDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      scope: {},
      templateUrl: '/templates/views/logout_view.html',
      controller: ['$scope','$location', 'auth', function($scope, $location, auth) {
        $scope.signedIn = function() {
          return auth.isSignedIn(); 
        };

        $scope.signOut = function() {
          auth.logout();
          $location.path('/create_user');
        };
      }]
    };
  });
};
