(function(app) {
  'use strict';

  app.component('esBuildingStatus', {
    templateUrl: 'app/components/buildingStatus/building-status.html',
    bindings: {
      statusCode: '<'
    },
    controllerAs: 'statusVm',
    controller: BuildingStatusController
  });

  function BuildingStatusController(statuses) {
    var vm = this;

    vm.getStatusLabel = function() {
      return _.find(statuses.list(), function(e) { return e.code === vm.statusCode; }).label;
    };
  }

}(angular.module('festima')));
