'use strict';

angular.module('festima')
  .service('buildingDealer', function($http) {
    angular.extend(this, {
      listBuildingDealers: function(buildingId) {
        return $http.get('http://localhost:3000/api/buildingDealers', {params: {buildingId: buildingId}});
      },

      saveBuildingDealer: function(buildingId, buildingDealer) {
        return $http.post('http://localhost:3000/api/buildingDealers', {buildingId: buildingId, dealerId: buildingDealer.id});
      }
    });
  });
