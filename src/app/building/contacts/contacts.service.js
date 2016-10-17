(function (app) {
  'use strict';

  app.service('contacts', ['$http', 'appConfig', function ($http, appConfig) {
    function saveContact(contact) {
      return $http.post(appConfig.apiUrl + '/buildings/' + contact.buildingId + '/contacts', contact).then(function (resp) {
        return resp.data;
      });
    }

    angular.extend(this, {
      saveContact: function (contact) {
        return $http.post(appConfig.apiUrl + '/buildings/' + contact.buildingId + '/contacts', contact).then(function (resp) {
          return resp.data;
        });
      }
    })
  }]);

}(angular.module('festima')));
