'use strict';

require('angular/angular');

var commentsApp = angular.module('commentsApp', []);

require('./comments/controllers/comments_controller')(commentsApp);
