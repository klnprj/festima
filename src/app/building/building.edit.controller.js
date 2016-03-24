angular.module('festima')
  .controller('BuildingEditController', function($routeParams, buildingsManager) {
    var vm = this;
    var id = $routeParams.buildingId;

    buildingsManager.getBuilding(id).then(
      function(building) {
        vm.building = building;
      }
    );

    angular.extend(vm, {
      buildingId: id
    });
  }
);
