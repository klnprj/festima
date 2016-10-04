(function(app) {
  'use strict';

  app.controller('BuildingListController', function ($scope, buildings) {
    var vm = this;

    vm.filtersCollapsed = true;

    vm.buildings = [];
    vm.currentPage = 1;
    vm.itemsPerPage = 10;

    vm.pageChanged = function() {
      buildings.list((vm.currentPage - 1) * vm.itemsPerPage, vm.itemsPerPage).then(function(result) {
        vm.buildings = result.items;
        vm.totalItems = result.total;
      });
    };

    vm.getBuildingDealers = function(building) {
      return building.dealers.map(function(d) {return d.title;}).join(', ');
    };

    vm.pageChanged();
  });

  app.directive('convertToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return parseInt(val, 10);
        });
        ngModel.$formatters.push(function(val) {
          return '' + val;
        });
      }
    };
  });

}(angular.module('festima')));

