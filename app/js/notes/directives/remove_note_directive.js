'use strict';

module.exports = function(app) {
  app.directive('removeNoteDirective', function() {
  return {
    restrict: 'AC',
    replace: true,
    transclude: true,
    templateUrl: '/templates/notes/remove_note.html',
    scope: {
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