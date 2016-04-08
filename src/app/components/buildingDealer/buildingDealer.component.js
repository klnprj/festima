angular.module('festima').component('esBuildingDealer', {
  templateUrl: 'app/components/buildingDealer/building-dealer.html',
  bindings: {
    positions: '<',
    newPosition: '<',
    onAddPosition: '&',
    onDeletePosition: '&'
  },
  controller: 'BuildingDealerController',
  controllerAs: 'dealerVm',
  transclude: true
});
