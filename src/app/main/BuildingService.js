angular.module("test")
  .service("buildingService", function($http) {

    this.getBuilding = function(id) {
      return $http.get('http://localhost:3000/api/buildings/' + id);
    };

    this.list = function() {
      return $http.get('http://localhost:3000/api/buildings');
    };
  });
