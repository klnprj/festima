(function(app) {
  'use strict';

  app.component('esComment', {
    templateUrl: 'app/components/comment/comment.html',
    bindings: {
      comment: '<'
    },
    controllerAs: 'commentVm',
    controller: CommentController
  });

  function CommentController() {

  }

}(angular.module('festima')));
