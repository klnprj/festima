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
        return $http.post(appConfig.apiUrl + '/buildings/' + contact.building.id + '/contacts', contact).then(function (resp) {
          return resp.data;
        });
      },

      delete: function(contact) {
        return $http.delete(appConfig.apiUrl + '/buildings/' + contact.building.id + '/contacts/' + contact.id).then(function(resp) {
          return resp.data;
        });
      }
    })
  }]);

}(angular.module('festima')));
