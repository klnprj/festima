'use strict';

/**
 * @ngdoc function
 * @name festimaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the festimaApp
 */
angular.module('festima')
  .controller('BuildingListController', function ($scope, buildings) {
    var vm = this;

    vm.buildings = [];
    vm.currentPage = 1;
    vm.itemsPerPage = 10;

    vm.pageChanged = function() {
      buildings.list((vm.currentPage - 1) * vm.itemsPerPage, vm.itemsPerPage).then(function(result) {
        vm.buildings = result.items;
        vm.totalItems = result.total;
      });
    };

    vm.pageChanged();
  });
