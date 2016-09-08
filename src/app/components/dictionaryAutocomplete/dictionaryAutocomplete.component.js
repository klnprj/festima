(function(app) {
  'use strict';

  app.component('esDictionaryAutocomplete', {
    templateUrl: 'app/components/dictionaryAutocomplete/dictionary-autocomplete.html',
    bindings: {
      key: '@',
      selected: '='
    },
    controller: DictionaryAutocompleteController,
    controllerAs: 'vm'
  });

  /** @ngInject */
  function DictionaryAutocompleteLink(scope, element, attrs, controller) {
    controller.key = attrs[this.name];
  }

  /** @ngInject */
  function DictionaryAutocompleteController($sce, dictionaries) {
    var vm = this;

    vm.items = [];

    vm.trustAsHtml = function(value) {
      return $sce.trustAsHtml(value);
    };

    vm.refreshItems = function(q) {
      dictionaries.itemsByKey(vm.key, undefined, undefined, q).then(function(items) {
        vm.items = items;
      });
    };

    vm.refreshItems();
  }

} (angular.module('festima')));
