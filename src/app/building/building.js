'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:BuildingCtrl
 * @description
 * # BuildingCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('BuildingCtrl', function ($scope, $routeParams, $http, buildingService) {
    var id = $routeParams.buildingId;

    $scope.building = buildingService.getBuilding(id).then(
      function(response) {
        $scope.building = response.data;
      },
      function(response) {

      }
    );
  });
