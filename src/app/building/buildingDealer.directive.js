angular.module('festima')
  .directive('esBuildingDealer', function(positions) {
    return{
      templateUrl: 'app/building/building-dealer.html',
      scope: {
        buildingDealer: '='
      },
      controller: 'BuildingDealerController',
      controllerAs: 'vm',
      bindToController: true
    }
});
