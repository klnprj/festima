angular.module('festima')
  .factory('User', ['$http', function ($http) {
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
          return $http.post('http://localhost:3000/api/users', this);
        },
        delete: function () {
          $http.delete('http://localhost:3000/api/users/' + this.id);
        },
        update: function () {
          $http.put('http://localhost:3000/api/users/' + this.id, this);
        },
      };
      return User;
    }]
  );
