'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:BuildingCtrl
 * @description
 * # BuildingCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('BuildingController', function ($routeParams, buildingService) {
    var id = $routeParams.buildingId;
    var vm = this;

    buildingService.getBuilding(id).then(
      function(response) {
        angular.extend(vm, response.data);
      },
      null
    );
  });
