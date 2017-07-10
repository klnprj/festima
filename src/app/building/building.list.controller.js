(function(app) {
  'use strict';

  app.controller('BuildingListController', function ($scope, buildings, users, statuses) {
    var vm = this;

    vm.filtersOpen = false;

    vm.buildings = [];
    vm.itemsPerPageValues = [50, 100, 200];
    vm.currentPage = 1;
    vm.itemsPerPage = 100;

    vm.pageChanged = function() {
      applyFilters({currentPage: vm.currentPage, itemsPerPage: vm.itemsPerPage}, {});
    };

    function applyFilters(criteria, filters) {
      buildings.list((criteria.currentPage - 1) * criteria.itemsPerPage, criteria.itemsPerPage, filters.q, filters.authorId, filters.status, filters.lastUpdatedFrom, filters.dealerId).then(function(result) {
        vm.buildings = result.items;
        vm.totalItems = result.total;
      });
    }

    vm.onApplyFilters = applyFilters;

    vm.search = function(q) {
      vm.q = q;
      console.log("Searched for: ", q);
      applyFilters({currentPage: vm.currentPage, itemsPerPage: vm.itemsPerPage}, {q: q});
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

