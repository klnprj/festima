angular.module('festima')
  .controller('MessagesModalController', function ($scope, $uibModalInstance, position, messages, onNewMessage) {
    var vm = this;

    vm.messages = messages;
    vm.onNewMessage = onNewMessage;

    vm.ok = function () {
      // $uibModalInstance.close($scope.selected.item);
      $uibModalInstance.close(position);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.addNewMessage = function() {
      vm.onNewMessage(vm.newMessage);
      vm.newMessage = {};
    };
  }
);
