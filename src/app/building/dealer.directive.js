angular.module('festima')
  .directive('esDealer', function(positions) {
    return{
      templateUrl: 'app/building/dealer.html',
      scope: {
        dealer: '=data'
      },
      controller: 'DealerController',
      controllerAs: 'vm',
      bindToController: true
    }
});
