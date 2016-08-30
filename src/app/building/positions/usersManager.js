angular.module('festima')
  .factory('usersManager', ['$http', '$q', 'appConfig', 'User', function ($http, $q, appConfig, User) {
    var cachedPromises = {};
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

      getUser: function (id) {
        if (angular.isUndefined(cachedPromises[id])) {
          cachedPromises[id] = $http.get(appConfig.apiUrl + '/users/' + id).then(function(response) {
              return response.data;
            })
        }

        return cachedPromises[id];
      },

      loadAllUsers: function () {
        var deferred = $q.defer();
        var scope = this;
        $http.get(appConfig.apiUrl + '/users')
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
