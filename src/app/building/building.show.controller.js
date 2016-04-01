'use strict';

angular.module('festima')
  .controller('BuildingShowController', function ($routeParams, buildingsManager) {
    var id = $routeParams.buildingId;
    var vm = this;

    buildingsManager.getBuilding(id).then(
      function(building) {
        vm.building = building;
      }
    )
  });
