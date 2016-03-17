'use strict';

angular.module('festima')
  .service('positions', function($http) {
    angular.extend(this, {
      list: function(dealerId) {
        return [];
      }
    });
  }
);
