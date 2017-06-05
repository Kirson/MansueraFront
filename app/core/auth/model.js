'use strict';
angular.module('auth').factory('authServices', function($resource){  
    var base_url = "http://localhost:8080/mansuera-0.0.1-SNAPSHOTuser/api/user";
    
    return function(action) {
        return $resource(base_url + action + '/:params', {params: '@_params'}
		,{
	        save: { 
	          method:"POST"
	        },
	        update: { 
	          method:"PUT"
	        },
	        get: { 
	          method:"GET"
	        },
	        query: { 
	          method:"GET"
	        }
	      }	    
        );              		        
    }            
});
