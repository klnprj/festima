(function(app) {
  'use strict';

  app.controller('DictionaryShowController', function($stateParams, dictionaries) {
    var vm = this;

    console.log("State params: ", $stateParams.key);
    dictionaries.loadByKey($stateParams.key).then(function(dictionary) {
      vm.dictionary = dictionary;
    });
  });

} (angular.module('festima')));
