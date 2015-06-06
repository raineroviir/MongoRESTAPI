'use strict';

module.exports = function(app) {
  app.directive('alertsDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '/templates/directives/alerts.html',
      scope: {},
      controller: function($scope) {

      console.log($scope);
      $scope.alerts = ['lalalalalal'];
      
      $scope.addAlert = function(type, msg) {
        $scope.alerts = [];
        $scope.alerts.push({type: type, msg: msg});
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
      }
    };
  });
};