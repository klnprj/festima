(function(app) {

  app.component('esDictionary', {
    templateUrl: 'app/components/dictionary/dictionary.html',
    bindings: {
      // dictionary: '<',
      key: '<'
    },
    controllerAs: 'dictionaryVm',
    controller: DictionaryComponentController
  });

  function DictionaryComponentController($q, dictionaries) {
    var vm = this;

    vm.items = [];
    vm.newItem = {};
    vm.currentPage = 1;
    vm.itemsPerPage = 10;

    vm.add = function(item) {
      dictionaries.addItem(vm.key, item).then(function(item) {
        vm.newItem = {};
        vm.pageChanged();  // update items
      });
    };

    vm.pageChanged = function() {
      var items = dictionaries.itemsByKey(vm.key, (vm.currentPage - 1) * vm.itemsPerPage, vm.itemsPerPage);
      var count = dictionaries.countItemsByKey(vm.key);

      $q.all({items: items, count: count}).then(function(result) {
        vm.items = result.items;
        vm.totalItems = result.count;
      });
    };

    vm.pageChanged();
  }

} (angular.module('festima')));
