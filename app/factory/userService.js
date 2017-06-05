 'use strict';
angular.module('inspinia').factory('UserService', function ($resource) {
	 var base_url_bpm = 'http://localhost:8090/activiti-rest/';
    var data = $resource(base_url_bpm+'/service/identity/users/:user', {user: "@user", size: 100});
    return data;
});
