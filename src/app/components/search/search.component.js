(function(app) {
  'use strict';

  app.component('esSearch', {
    templateUrl: 'app/components/search/search.html',
    bindings: {
      onSearchChanged: '&'
    },
    controllerAs: 'searchVm',
    controller: SearchController
  });

  function SearchController() {
    var vm = this;

    var q = vm.q;
    Object.defineProperty(this, 'q', {
      get: function() {
        return this._q;
      },
      set: function(value) {
        this._q = value;
        vm.onSearchChanged({q: value});
      }
    })
  }

}(angular.module('festima')));
