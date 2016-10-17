(function(app) {
  'use strict';

  app.filter('notRemoved', function () {
    return function (items) {
      return _.filter(items, function(item) { return item.removed === undefined; })
    };
  });

}(angular.module('festima')));
