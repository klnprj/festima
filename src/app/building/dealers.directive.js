angular.module('festima')
  .directive('dealers', function() {
    return {
      templateUrl: 'app/building/dealers.html',
      controller: 'DealerListController',
      controllerAs: 'dealerVm'
    };
});
