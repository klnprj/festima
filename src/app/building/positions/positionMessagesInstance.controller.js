angular.module('festima')
  .controller('PositionMessagesInstanceController', function ($scope, $uibModalInstance, $filter, position, messages, messagesManager, Message, moment) {
    var vm = this;

    vm.messages = messages;

    vm.ok = function () {
      // $uibModalInstance.close($scope.selected.item);
      $uibModalInstance.close(position);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.addMessage = function(_message) {
      var msg = new Message(angular.extend(_message, {authorId: 1, positionId: position.id, dateCreated: moment().format()}));
      vm.newMessage = {};

      msg.save().then(function(id) {
        messagesManager.getMessage(id).then(function(message) {
          vm.messages.push(message);
        });
      });
    };
  }
);
