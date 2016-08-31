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
    vm.itemsPerPage = 3;

    refreshItemsCount();

    function refreshItemsCount() {
      dictionaries.countItemsByKey(vm.dictionary.key).then(function(count) {
        vm.totalItems = count;
      });
    }

    vm.add = function(item) {
      dictionaries.addItem(vm.dictionary.key, item);
      vm.newItem = {};
      refreshItemsCount();
      vm.pageChanged();  // update items
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
