angular.module('festima')
  .directive('esBuildingDealerList', function() {
    return {
      templateUrl: 'app/building/building-dealer-list.html',
      scope: {
        dealers: '=data'
      },
      link: function($scope) {
        $scope.save = function() {

        }
      }
    };
});
