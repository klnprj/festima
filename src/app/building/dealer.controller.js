angular.module('festima')
  .controller('DealerController', function(positions) {
    var vm = this;
    
    angular.extend(vm, {
      positions: positions.list(dealer.id)
    });
  }
);
