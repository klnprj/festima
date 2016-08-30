(function(app) {

  app.component('esDictionary', {
    templateUrl: 'app/components/dictionary/dictionary.html',
    bindings: {
      dictionary: '<'
    },
    controllerAs: 'dictionaryVm',
    controller: DictionaryComponentController
  });

  function DictionaryComponentController(dictionaries) {
    var vm = this;

    vm.items = [];
    vm.newItem = {};
    vm.currentPage = 1;
    vm.totalItems = vm.items.length;
    vm.itemsPerPage = 1;

    vm.add = function(item) {
      dictionaries.addItem(vm.dictionary.key, item);
      vm.newItem = {};
    };

    vm.pageChanged = function() {
      dictionaries.itemsByKey(vm.dictionary.key, (vm.currentPage - 1) * vm.itemsPerPage, vm.itemsPerPage).then(function(items) {
        vm.items = items;
      });
      console.log('Page changed to: ', vm.currentPage);
    };

    vm.pageChanged();
    console.log('Dictionary: ', vm.dictionary);
  }

} (angular.module('festima')));
