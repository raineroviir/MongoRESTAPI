'use strict';

module.exports = function(app) {
  app.directive('alertsDirective', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/views/alerts.html',
      scope: true,
      controller: function($scope) {
      $scope.alerts = [];
      
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