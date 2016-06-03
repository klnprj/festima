'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('BuildingListController', function ($scope, buildingsManager) {
    var vm = this;
    angular.extend(vm, {
      buildings: []
    });

    buildingsManager.loadAllBuildings().then(
      function(buildings) {
        vm.buildings = buildings;
      }
    )
  });
