angular.module('festima').controller('PositionMessagesInstanceController', function ($scope, $uibModalInstance, position) {

  $scope.ok = function () {
    // $uibModalInstance.close($scope.selected.item);
    $uibModalInstance.close(position);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
