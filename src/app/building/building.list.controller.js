(function(app) {
  'use strict';

  app.controller('BuildingListController', function ($scope, buildings, users, statuses) {
    var vm = this;

    vm.filtersOpen = false;

    vm.buildings = [];
    vm.users = [];
    vm.statuses = [];
    vm.itemsPerPageValues = [50, 100, 200];
    vm.currentPage = 1;
    vm.itemsPerPage = 100;
    vm.filter = {status: ['ACTIVE']};

    function loadUsers() {
      users.list().then(function(usersList) {
        vm.users = usersList;
      });
    }

    function loadStatuses() {
      vm.statuses = statuses.list();
    }

    function loadBuildings(q) {
      buildings.list((vm.currentPage - 1) * vm.itemsPerPage, vm.itemsPerPage, q, vm.filter.authorId, vm.filter.status).then(function(result) {
        vm.buildings = result.items;
        vm.totalItems = result.total;
      });
    }

    loadUsers();
    loadStatuses();

    vm.pageChanged = function() {
      loadBuildings();
    };

    vm.search = function(q) {
      vm.q = q;
      console.log("Searched for: ", q);
      loadBuildings(q);
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

