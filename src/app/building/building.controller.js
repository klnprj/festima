'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:BuildingCtrl
 * @description
 * # BuildingCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('BuildingController', function ($routeParams, buildingsManager) {
    var id = $routeParams.buildingId;
    var vm = this;

    buildingsManager.getBuilding(id).then(
      function(building) {
        vm.building = building;
      }
    )
  });
