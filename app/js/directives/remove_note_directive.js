'use strict';

module.exports = function(app) {
  return {
    restrict: 'ACME',
    transclude: true,
    replace: true,
    templateUrl: 'templates/directives/remove_note.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function($scope) {
      console.log($scope);
      $scope.removing = false;
      $scope.startRemove = function() {
        $scope.removing = true;
      };

      $scope.cancelRemove = function() {
        $scope.removing = false;
      };
      
      $scope.confirmRemove = function() {
        $scope.notifyParent();
      };
    }
  };
};