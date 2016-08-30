angular.module('festima')
  .controller('MessagesButtonController', function($uibModal, $log, moment, Message, messagesManager, session) {
    var vm = this;

    vm.openMessages = function () {
      // var _messages;
      var modalInstance;

      messagesManager.loadAllMessages(vm.position.id).then(function(data) {
        vm.messages = data;

        modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/components/messagesButton/messages-modal.html',
          controller: 'MessagesModalController',
          controllerAs: 'messagesModalVm',
          size: 'lg',
          resolve: {
            position: function () {
              return vm.position;
            },
            messages: function() {
              return vm.messages;
            },
            onNewMessage: function() {
              return vm.addMessage;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          // $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      });
    };

    vm.addMessage = function(_message) {
      var msg = new Message(angular.extend(_message, {authorId: session.userId(), positionId: vm.position.id, dateCreated: moment().format()}));

      msg.save().then(function(id) {
        // messagesManager.loadAllMessages(vm.position.id).then(function(data) {
        //   angular.copy(data, vm.messages);
        // });
        messagesManager.getMessage(id).then(function(message) {
          vm.messages.push(message);
        });
      });
    };
  }
);
