'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('BuildingListController', function ($scope, buildingService, buildingsManager) {
    var vm = this;
    angular.extend(vm, {
      buildings: []
    });

    // buildingService.list().then(
    //   function(response) {
    //     vm.buildings = response.data;
    //   },
    //   null
    // );

    buildingsManager.loadAllBuildings().then(
      function(buildings) {
        vm.buildings = buildings;
      }
    )
  });
