angular.module('festima').component('esDealerPositions', {
  templateUrl: 'app/components/dealerPositions/dealer-positions.html',
  bindings: {
    positions: '<',
    newPosition: '<',
    onAddPosition: '&',
    onDeletePosition: '&'
  },
  controller: 'DealerPositionsController',
  controllerAs: 'positionsVm',
  transclude: true
});
