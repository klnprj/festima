angular.module('festima')
  .factory('messagesManager', ['$http', '$q', 'Message', 'usersManager', 'appConfig', function ($http, $q, Message, usersManager, appConfig) {
    var messagesManager = {
      _pool: {},
      _retrieveInstance: function (id, data) {
        var instance = this._pool[id];

        if (instance) {
          instance.setData(data);
        } else {
          instance = new Message(data);
          this._pool[id] = instance;
        }

        return instance;
      },
      _search: function (id) {
        return this._pool[id];
      },
      _load: function (id, deferred) {
        var scope = this;

        $http.get(appConfig.apiUrl + '/messages/' + id)
          .success(function (data) {
            var itemData = data;
            var item;

            usersManager.getUser(itemData.author.id).then(function(data) {
              // delete itemData.authorId;
              itemData.author = data;
              item = scope._retrieveInstance(itemData.id, itemData);
              deferred.resolve(item);
            });
          })
          .error(function () {
            deferred.reject();
          });
      },

      getMessage: function (id) {
        var deferred = $q.defer();
        var item = this._search(id);
        if (item) {
          deferred.resolve(item);
        } else {
          this._load(id, deferred);
        }
        return deferred.promise;
      },

      loadAllMessages: function (positionId) {
        var deferred = $q.defer();
        var scope = this;
        $http.get(appConfig.apiUrl + '/messages', {params: {positionId: positionId}})
          .success(function (itemsArray) {
            var items = [];
            var item;

            if (itemsArray.length == 0) {
              deferred.resolve([]);
              return;
            }

            itemsArray.forEach(function (itemData) {
              usersManager.getUser(itemData.author.id).then(function(data) {
                // delete itemData.authorId;
                itemData.author = data;
                item = scope._retrieveInstance(itemData.id, itemData);
                items.push(item);
              }).then(function() {
                deferred.resolve(items);
              });
            });
          })
          .error(function () {
            deferred.reject();
          });
        return deferred.promise;
      },

      setMessage: function (data) {
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

    return messagesManager;
  }]);
