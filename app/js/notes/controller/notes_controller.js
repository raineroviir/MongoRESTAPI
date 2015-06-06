'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', 'RESTResource', 'copy', function($scope, resource, copy) {
    var Note = resource('notes');
    $scope.errors = [];
    $scope.notes = [];
    $scope.removing = false;

    $scope.getAll = function() {
      Note.getAll(function(err, data) {
        if (err) return $scope.errors.push({msg: 'error retrieving note'});
        $scope.notes = data;
      });
    };

    $scope.createNewNote = function(note) {
      var newNote = copy(note);
      note.noteBody = '';
      $scope.notes.push(newNote);
      Note.create(newNote, function(err, data) {
        if(err) return $scope.errors.push({msg: 'could not save note: ' + newNote.noteBody});
        $scope.notes.splice($scope.notes.indexOf(newNote), 1, data);
      });
    };

    $scope.removeNote = function(note) {
      $scope.notes.splice($scope.notes.indexOf(note), 1);
      Note.remove(note, function(err) {
        if(err) {
          $scope.errors.push({msg: 'could not remove note'});
        }
      });
    };

    $scope.startRemove = function() {
      $scope.removing = true;
    };

    $scope.cancelRemove = function() {
      $scope.removing = false;
    };
    
    $scope.confirmRemove = function() {
      $scope.notifyParent();
    };

    $scope.saveNote = function(note) {
      note.editing = false;
      Note.save(note, function(err, data) {
          if(err) $scope.errors.push({msg: 'could not update note'});
      });
    };

    $scope.toggleEdit = function(note) {
      if(note.editing) {
        note.noteBody = note.noteBodyBackup;
        note.noteBodyBackup = undefined;
        note.editing = false;
      } else {
        note.noteBodyBackup = note.noteBody;
        note.editing = true;
      }
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
