angular.module('festima')
  .directive('esDealer', function() {
    return{
      templateUrl: 'app/building/dealer.html',
      scope: {
        dealer: '=data'
      }
    }
});
