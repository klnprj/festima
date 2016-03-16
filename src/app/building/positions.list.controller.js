'use strict';

angular.module('festima')
  .controller('DealerPositionsController', function (dealer) {
    var vm = this;

    angular.extend(vm, {
      list: function (q) {
        return dealer.list(q).then(function (response) {
          return response.data;
        });
      },
      dealer: {},
      refreshDealers: function (q) {
        vm.list(q).then(function (data) {
          vm.dealers = data;
        });
      }
    });
  });
