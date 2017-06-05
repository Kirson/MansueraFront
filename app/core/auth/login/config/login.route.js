angular.module('auth').config(['$routeProvider', function ($routeProvider){
	$routeProvider.
	when('/login', {
		templateUrl: 'app/core/auth/login/views/login.html',
		controller: 'AuthLoginController',
	}).
	otherwise({
		redirectTo: '/'
	})

}]);