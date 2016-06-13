angular.module('festima')
  .factory('User', ['$http', 'appConfig', function ($http, appConfig) {
      function User(data) {
        if (data) {
          this.setData(data);
        }
        // some init
      };

      User.prototype = {
        setData: function (data) {
          angular.extend(this, data);
        },
        save: function () {
          return $http.post(appConfig.apiUrl + '/users', this);
        },
        delete: function () {
          $http.delete(appConfig.apiUrl + '/users/' + this.id);
        },
        update: function () {
          $http.put(appConfig.apiUrl + '/users/' + this.id, this);
        },
      };
      return User;
    }]
  );
