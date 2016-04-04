angular.module('festima')
  .factory('Message', ['$http', function ($http) {
      function Message(data) {
        if (data) {
          this.setData(data);
        }
        // some init
      };
    
      Message.prototype = {
        setData: function (data) {
          angular.extend(this, data);
        },
        save: function () {
          return $http.post('http://localhost:3000/api/messages', this);
        },
        delete: function () {
          $http.delete('http://localhost:3000/api/messages/' + this.id);
        },
        update: function () {
          $http.put('http://localhost:3000/api/messages/' + this.id, this);
        },
      };
      return Message;
    }]
  );
