'use strict';

angular.module('festima')
  .service('positions', function($http) {
    angular.extend(this, {
      list: function(dealerId) {
        return $http.get('http://localhost:3000/api/positions', {params: {dealerId: dealerId}});
        // return $http.get('http://localhost:3000/api/dealers/' + dealerId +'/positions');
      },
      create: function(dealerId, position) {
        return $http.post('http://localhost:3000/api/positions', angular.extend(position, {dealerId: dealerId}));
      }
    });
  }
);
