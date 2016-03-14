angular.module('festima')
  .service("buildingService", function($http) {

    this.getBuilding = function(id) {
      return $http.get('http://localhost:3000/api/buildings/' + id);
    };

    this.list = function() {
      return $http.get('http://localhost:3000/api/buildings');
    };

    this.save = function(name, address, client, project, manager) {
      return $http.post('http://localhost:3000/api/buildings', {name: name, address: address, client: client, project: project, manager: manager});
    };
  });
