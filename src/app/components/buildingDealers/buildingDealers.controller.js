angular.module('festima')
  .controller('BuildingDealersController', function(buildingDealersService) {
    var vm = this;

    buildingDealersService.loadDealers();
    buildingDealersService.loadPositions(vm.buildingId);

    vm.service = buildingDealersService;

    vm.addDealerPosition = function(dealerId, position) {
      buildingDealersService.addDealerPosition(dealerId, position);
    };

    vm.removeDealerPosition = function(dealerId, position) {
      buildingDealersService.removeDealerPosition(dealerId, position);
    };

    vm.addDealer = function (dealer) {
      buildingDealersService.addDealer(dealer);
      vm.dealer = {};
    };
  }
);
