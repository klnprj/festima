'use strict';

angular.module('festima')
  .service('positions', function($http) {
    angular.extend(this, {
      list: function(buildingDealerId) {
        return $http.get('http://localhost:3000/api/positions', {params: {buildingDealerId: buildingDealerId}});
        // return $http.get('http://localhost:3000/api/dealers/' + dealerId +'/positions');
      },
      create: function(buildingDealerId, position) {
        return $http.post('http://localhost:3000/api/positions', angular.extend(position, {buildingDealerId: buildingDealerId}));
      }
    });
  }
);
