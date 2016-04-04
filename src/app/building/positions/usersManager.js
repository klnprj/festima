angular.module('festima')
  .factory('usersManager', ['$http', '$q', 'User', function ($http, $q, User) {
    var usersManager = {
      _pool: {},
      _retrieveInstance: function (id, data) {
        var instance = this._pool[id];

        if (instance) {
          instance.setData(data);
        } else {
          instance = new User(data);
          this._pool[id] = instance;
        }

        return instance;
      },
      _search: function (id) {
        return this._pool[id];
      },
      _load: function (id, deferred) {
        var scope = this;

        $http.get('http://localhost:3000/api/users/' + id)
          .success(function (data) {
            var itemData = data;
            var item = scope._retrieveInstance(itemData.id, itemData);

            deferred.resolve(item);

          })
          .error(function () {
            deferred.reject();
          });
      },

      getUser: function (id) {
        var deferred = $q.defer();
        var item = this._search(id);
        if (item) {
          deferred.resolve(item);
        } else {
          this._load(id, deferred);
        }
        return deferred.promise;
      },

      loadAllUsers: function () {
        var deferred = $q.defer();
        var scope = this;
        $http.get('http://localhost:3000/api/users')
          .success(function (itemsArray) {
            var items = [];
            itemsArray.forEach(function (itemData) {
              var item = scope._retrieveInstance(itemData.id, itemData);
              items.push(item);
            });

            deferred.resolve(items);
          })
          .error(function () {
            deferred.reject();
          });
        return deferred.promise;
      },

      setUser: function (data) {
        var scope = this;
        var item = this._search(data.id);
        if (item) {
          item.setData(data);
        } else {
          item = scope._retrieveInstance(data);
        }
        return item;
      }
    };

    return usersManager;
  }]);
