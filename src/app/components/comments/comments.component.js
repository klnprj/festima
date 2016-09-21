(function(app) {
  'use strict';

  app.component('esComments', {
    templateUrl: 'app/components/comments/comments.html',
    bindings: {
      comments: '<',
      onAddComment: '&'
    },
    controllerAs: 'commentsVm',
    controller: CommentsController
  });

  function CommentsController() {
    var vm = this;
    vm.newComment = {};

    vm.addNewComment = function() {
      vm.onAddComment({comment: vm.newComment.text});
      vm.newComment = {};
    }
  }

}(angular.module('festima')));
