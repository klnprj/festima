(function(app) {
  'use strict';

  app.controller('AddressListController', function(_, maps, addresses) {
    var vm = this;

    // vm.buildings = [];

    vm.onSelectAddress = function(address) {
      vm.addressObject = address;
    };
  });

}) (angular.module('festima'));
