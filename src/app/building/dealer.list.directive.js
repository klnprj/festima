angular.module('festima')
  .directive('esDealerList', function() {
    return {
      templateUrl: 'app/building/dealer-list.html',
      scope: {
        dealers: '=data'
      }
    };
});
