'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('MainController', function ($scope, $http, buildingService) {
    $scope.buildings = [];

    buildingService.list().then(
      function(response) {
        $scope.buildings = response.data;
      },
      function(response) {

      }
    );
  });
