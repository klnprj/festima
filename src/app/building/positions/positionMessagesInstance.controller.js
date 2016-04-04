angular.module('festima')
  .controller('PositionMessagesInstanceController', function ($scope, $uibModalInstance, position, messages) {
    var vm = this;

    vm.messages = messages;

    vm.ok = function () {
      // $uibModalInstance.close($scope.selected.item);
      $uibModalInstance.close(position);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
);
