angular.module('festima')
  .controller('AddDealerButtonController', function(dealers){
    var vm = this;

    vm.addDealer = function() {
      if ( !vm.onCheckAdded({dealer: vm.dealer})) {
        vm.onAddDealer({dealer: vm.dealer});
      }

      vm.dealer = undefined;
    };

    vm.refreshDealers = function (q) {
      dealers.list1().then(function (dealers) {
        vm.dealers = dealers;
      })
    };

  }
);
