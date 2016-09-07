(function(app) {
  'use strict';

  app.directive('esDictionaryAutocomplete', dictionaryAutocomplete);

  /** @ngInject */
  function dictionaryAutocomplete() {
    var directive = {
      restrict: 'A',
      // replace: true,
      // transclude: true,
      templateUrl: 'app/components/dictionaryAutocomplete/dictionary-autocomplete.html',
      scope: {
        key: '<'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: DictionaryAutocompleteController,
      link: DictionaryAutocompleteLink
    };

    return directive;
  }

  /** @ngInject */
  function DictionaryAutocompleteLink(scope, element, attrs, controller) {
    controller.key = attrs[this.name];
  }

  /** @ngInject */
  function DictionaryAutocompleteController($sce, dictionaries) {
    var vm = this;

    vm.trustAsHtml = function(value) {
      return $sce.trustAsHtml(value);
    };

    vm.refreshItems = function() {
      dictionaries.itemsByKey(vm.key).then(function(items) {
        vm.items = items;
      });
    };

    vm.refreshItems();
  }

} (angular.module('festima')));
