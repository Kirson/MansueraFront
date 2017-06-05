'use strict';
angular.module('rest').factory('restServices', function($resource){  
    var base_url = "http://localhost:8080/mansuera-0.0.1-SNAPSHOT";
    
    
    return function(action) {
        return $resource(base_url + action + '/:params', {params: '@_params'}
		,{
	        get: { 
	          method:"GET"
	        },
	        save: { 
	          method:"POST",
	          headers:{'Accept': 'application/json', 'Content-Type': 'application/json; ; charset=UTF-8'} 
	        },
	        delete: { 
	          method:"POST",
	          headers: {
    					"Access-Control-Allow-Origin" : "*",
    					"Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
    					"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers,Access-Control-Allow-Origin, Authorization, X-Requested-With"
				}
	        },
	        update: { 
	          method:"PUT"
	        },
	        query: { 
	          method:"GET",  isArray:true
	        }
	      }	    
        );              		        
    }            
});
