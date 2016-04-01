angular.module('festima').factory('Building', ['$http', function($http) {
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
      return $http.post('http://localhost:3000/api/buildings', this);
    },
    delete: function() {
      $http.delete('http://localhost:3000/api/buildings/' + this.id);
    },
    update: function() {
      $http.put('http://localhost:3000/api/buildings/' + this.id, this);
    },
  };
  return Building;
}]);
