(function(app) {
  'use strict';

  app.component('esComments', {
    templateUrl: 'app/components/comments/comments.html',
    bindings: {
      comments: '<'
    },
    controllerAs: 'commentsVm',
    controller: CommentsController
  });

  function CommentsController() {

  }

}(angular.module('festima')));
