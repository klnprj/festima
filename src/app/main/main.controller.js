'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the festimaApp
 */
angular.module('test')
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
