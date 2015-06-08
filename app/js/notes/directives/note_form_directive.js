'use strict';

module.exports = function(app) {
  app.directive('noteFormDirective', function() {
    return {

      restrict: 'AE',
      replace: true,
      transclude: true,
      templateUrl: '/templates/notes/note_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      }
    };
  });
};
