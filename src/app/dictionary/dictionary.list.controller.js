(function(app) {
  'use strict';

  app.controller('DictionaryListController', function(dictionaries) {
    var vm = this;

    dictionaries.listAll().then(function(dictionaries) {
      vm.dictionaries = dictionaries;
    });
  });

} (angular.module('festima')));
