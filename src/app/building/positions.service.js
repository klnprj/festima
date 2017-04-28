'use strict';

angular.module('festima')
  .service('positions', function($http, appConfig) {
    angular.extend(this, {
      listAllByBuilding: function(buildingId) {
        return $http.get(appConfig.apiUrl + '/positions', {params: {buildingId: buildingId}});
      },
      createPosition: function(positionData) {
        return $http.post(appConfig.apiUrl + '/positions', positionData).then(function(resp) { return resp.data; });
      },
      delete: function(positionId) {
        return $http.delete(appConfig.apiUrl + '/positions/' + positionId);
      },
      update: function(position) {
        return $http.put(appConfig.apiUrl + '/positions/' + position.id, position);
      }
    });
  }
);
