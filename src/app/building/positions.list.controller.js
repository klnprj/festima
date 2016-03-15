'use strict';

angular.module('festima')
  .controller('DealerPositionsController', function($scope, dealer) {
    var vm = this;

    angular.extend(vm, {
      list: function (q) {
        return dealer.list(q).then(function (response) {
          return response.data;
        });
      }
    });
});
