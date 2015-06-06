'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-bootstrap/dist/ui-bootstrap-tpls.js');

var notesApp = angular.module('notesApp', ['ngRoute', 'ngCookies', 'base64', 'ui.bootstrap']);

//services
require('./services/copy')(notesApp);
require('./services/rest_resource')(notesApp);
// require('./auth/services/auth')(notesApp);

//controllers
require('./notes/controller/notes_controller')(notesApp);
// require('./auth/controllers/auth_controller')(notesApp);

//directives
require('./directives/simple_directive')(notesApp);
require('./notes/directives/note_form_directive')(notesApp);
// require('./directives/alerts_directive')(notesApp);
// require('./auth/directives/logout_directive')(notesApp);
// require('./directives/remove_note_directive')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/notes', {
    templateUrl: 'templates/views/notes_view.html',
    controller: 'notesController'
  })
  .when('/sign_in', {
    templateUrl: 'templates/views/sign_in.html'
    // ,controller: 'authController'
  })
  .when('/create_user', {
    templateUrl: 'templates/views/create_user.html'
    // ,controller: 'authController'
  })
  .when('/', {
    redirectTo: '/notes'
  })
  .otherwise({
    redirectTo: '/create_user'
  });
}]);