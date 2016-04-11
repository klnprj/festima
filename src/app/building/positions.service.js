'use strict';

angular.module('festima')
  .service('positions', function($http) {
    angular.extend(this, {
      listAllByBuilding: function(buildingId) {
        return $http.get('http://localhost:3000/api/positions', {params: {buildingId: buildingId}});
      },
      createPosition: function(positionData) {
        return $http.post('http://localhost:3000/api/positions', positionData).then(function(resp) { return resp.data; });
      },
      delete: function(positionId) {
        return $http.delete('http://localhost:3000/api/positions/' + positionId);
      }
    });
  }
);
