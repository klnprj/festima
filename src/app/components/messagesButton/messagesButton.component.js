angular.module('festima').component('messagesButton', {
  templateUrl: 'app/components/messagesButton/messages-button.html',
  bindings: {
    position: '<'
  },
  controller: 'MessagesButtonController',
  controllerAs: 'messagesButtonVm'
});
