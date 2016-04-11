angular.module('festima').component('esAddDealerButton', {
  templateUrl: 'app/components/addDealerButton/add-dealer-button.html',
  bindings: {
    onAddDealer: '&',
    onCheckAdded: '&'
  },
  controller: 'AddDealerButtonController',
  controllerAs: 'addDealerVm'
});
