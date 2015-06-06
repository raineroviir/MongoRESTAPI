'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('notes controller', function() {
  var $CC;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CC = $controller; 
  }));

  it('should be able to create a new controller', function() {
    var notesController = $CC('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(Array.isArray($scope.notes)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.notesController = $CC('notesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/notes').respond(200, [{_id: '1', noteBody: 'test note'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note');
      expect($scope.notes[0]._id).toBe('1');
    });

    it('should correctly handle errors', function() {
      $httpBackend.expectGET('/api/notes').respond(500, {msg: 'error handling works'});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving note');
    });

    it('should be able to save a new note', function() {
      var note = {_id: '2', noteBody: 'test note'};
      $httpBackend.expectPOST('/api/notes').respond(200, note);
      $scope.createNewNote(note);
      $httpBackend.flush();
      expect($scope.notes[0]._id).toBe('2');
      expect($scope.newNote).toBe(undefined);
    });

    it('should be able to edit/put a note', function() {
      var note = {_id: '5', noteBody: 'test note'};   
      var expectedResponse = {_id: '5', noteBody: 'test note edited'};

      $httpBackend.expectPUT('/api/notes/' + note._id).respond(200, expectedResponse);
      $scope.saveNote(expectedResponse);
      $httpBackend.flush();
      expect(expectedResponse.editing).toBe(false);
    });

    it('should be able to delete a note', function() {
      var note = {_id: '3', noteBody: 'test note'};
      $scope.notes.push(note);
      $httpBackend.expectDELETE('/api/notes/' + note._id).respond(200, {_id: '3', noteBody:'test note'});
      expect($scope.notes.indexOf(note)).not.toBe(-1);
      $scope.removeNote(note);
      expect($scope.notes.indexOf(note)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

    it('should delete a note even on server error', function() {
      var note = {_id: '4', noteBody: 'test note'};
      $scope.notes.push(note);
      $httpBackend.expectDELETE('/api/notes/' + note._id).respond(500, {msg: 'error deleting note'});
      expect($scope.notes.indexOf(note)).not.toBe(-1);
      $scope.removeNote(note);
      expect($scope.notes.indexOf(note)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not remove note');
    });
  });
});