'use strict';

angular.module('festima')
  .service('positions', function($http) {
    angular.extend(this, {
      list: function(buildingDealerId) {
        return $http.get('http://localhost:3000/api/positions', {params: {buildingDealerId: buildingDealerId}});
      },
      list1: function(buildingId) {
        return $http.get('http://localhost:3000/api/positions', {params: {buildingId: buildingId}});
      },
      create: function(buildingDealerId, position) {
        return $http.post('http://localhost:3000/api/positions', angular.extend(position, {buildingDealerId: buildingDealerId}));
      },
      create1: function(position) {
        return $http.post('http://localhost:3000/api/positions', position);
      },
      delete: function(positionId) {
        return $http.delete('http://localhost:3000/api/positions/' + positionId);
      }
    });
  }
);
