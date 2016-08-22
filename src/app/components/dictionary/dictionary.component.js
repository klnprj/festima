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

    console.log('Dictionary: ', vm.dictionary);
  }

} (angular.module('festima')));
