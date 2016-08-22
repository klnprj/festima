(function(app) {
  'use strict';

  app.controller('DictionaryShowController', function($routeParams, dictionaries) {
    var vm = this;

    console.log("State params: ", $routeParams.key);
    dictionaries.loadByKey($routeParams.key).then(function(dictionary) {
      vm.dictionary = dictionary;
    });
  });

} (angular.module('festima')));
