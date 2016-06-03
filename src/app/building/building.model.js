angular.module('festima').factory('Building', ['$http', 'appConfig', function($http, appConfig) {
  
  function Building(data) {
    if (data) {
      this.setData(data);
    }
    // some init
  };
  Building.prototype = {
    setData: function(data) {
      angular.extend(this, data);
    },
    save: function() {
      return $http.post(appConfig.apiUrl + '/buildings', this).then(function(resp) {
        return resp.data;
      });
    },
    delete: function() {
      $http.delete(appConfig.apiUrl + '/buildings/' + this.id);
    },
    update: function() {
      $http.put(appConfig.apiUrl + '/buildings/' + this.id, this);
    },
  };
  return Building;
}]);
