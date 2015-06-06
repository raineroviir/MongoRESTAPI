'use strict';

module.exports = function(app) {
  app.directive('noteFormDirective', function() {
    return {

      restrict: 'AE',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/note_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '=',
        notifyParent: '&method'
      },
      controller: function($scope) {
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
  });
};
