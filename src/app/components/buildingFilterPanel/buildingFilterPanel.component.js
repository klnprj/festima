(function(app) {
  'use strict';

  app.component('esBuildingFilterPanel', {
    templateUrl: 'app/components/buildingFilterPanel/building-filter-panel.html',
    bindings: {
      onApplyFilters: '&'
    },
    controllerAs: 'filterPanelVm',
    controller: BuildingFilterPanel
  });

  function BuildingFilterPanel(users, statuses, dealers) {
    var vm = this;

    vm.users = [];
    vm.statuses = [];
    vm.dealers = [];
    vm.itemsPerPageValues = [50, 100, 200];
    vm.filters = {status: []};
    // vm.filters = {status: ['ACTIVE']};
    vm.criteria = {};
    vm.criteria.currentPage = 1;
    vm.criteria.itemsPerPage = 100;

    function loadUsers() {
      users.list().then(function(usersList) {
        vm.users = usersList;
      });
    }

    function loadStatuses() {
      vm.statuses = statuses.list();
    }

    function loadDealers() {
      dealers.listAll().then(function(dealersList) {
        vm.dealers = dealersList;
      });
    }

    loadUsers();
    loadStatuses();
    loadDealers();

    vm.applyFilters = function() {
      vm.onApplyFilters({criteria: vm.criteria, filters: vm.filters});
    }
  }

}(angular.module('festima')));
