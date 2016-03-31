angular.module('festima').directive('esDealersPositions', function() {
  return {
    scope: {
      buildingId: '='
    },
    templateUrl: 'app/building/positions/dealers-positions.html',
    controller: 'DealersPositionsController',
    controllerAs: 'positionsVm',
    bindToController: true
  };
});
