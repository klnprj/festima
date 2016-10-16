(function(app) {
  'use strict';

  app.component('esAddContact', {
    templateUrl: 'app/components/addContact/add-contact.html',
    bindings: {
      onContactAdded: '&'
    },
    controllerAs: 'addContactVm',
    controller: AddContactController
  });

  function AddContactController(appConfig, $http) {
    var vm = this;

    function initNewContact() {
      vm.newItem = {};
      vm.contacts = [];
    }

    function getContactTypes() {
      return $http.get(appConfig.apiUrl + '/dictionaries').then(function(response) {
        return response.data;
      })
    }

    function getContacts(key) {
      return $http.get(appConfig.apiUrl + '/dictionaries/' + key + '/items').then(function(response) {
        return response.data;
      });
    }

    initNewContact();

    getContactTypes().then(function(contactTypes) {
      vm.contactTypes = contactTypes;
    });

    vm.addContact = function(newContact) {
      newContact.contactName = _.find(vm.contacts, function(contact) { return contact.id == newContact.contactId; }).title;
      console.log("New contact: ", newContact);
      vm.onContactAdded({newContact: newContact});
      initNewContact();
    };

    Object.defineProperty(vm.newItem, 'contactType', {
      get: function() {
        return vm.newItem._contactType;
      },
      set: function(newValue) {
        vm.newItem._contactType = newValue;
        getContacts(newValue).then(function(contacts) {
          vm.contacts = contacts;
        });
      }
    });
  }

}(angular.module('festima')));
