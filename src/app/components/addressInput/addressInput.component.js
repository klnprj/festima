(function(app) {
  'use strict';

  app.component('esAddressInput', {
    templateUrl: 'app/components/addressInput/address-input.html',
    bindings: {
      onAddressSelected: '&'
    },
    controllerAs: 'addressInputVm',
    controller: AddressInputController
  });

  function AddressInputController(maps) {
    var vm = this;

    vm.getLocation = function(q) {
      return maps.suggestions(q).then(function(items){
        return items.map(function(item){
          return item;
        });
      });
    };

    vm.onSelect = function(itemData, model, label) {
      maps.search(itemData.hint.text).then(function(items) {
        var item = items[0];

        vm.onAddressSelected({address: item});
      });
    };
  }

}(angular.module('festima')));
