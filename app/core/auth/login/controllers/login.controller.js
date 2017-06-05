angular.module('auth').controller('AuthLoginController', function ( $scope,  $route, $location, restServices,authServices){
	
	$scope.login = function (){

		console.log("===>> login");
	authServices("login").save({email: $scope.user.email, password: $scope.user.password}, function(data){
		if(data.status !== 500){
			$cookies.put("access_token", data.token);
			$location.path('/dashboard_dashboard1');
		}
	});
}
	
	
});
