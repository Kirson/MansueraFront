angular.module('inspinia').factory('ProcessInstancesService', function ($resource) {
    var data = $resource('service/runtime/process-instances/:processInstance', {processInstance: "@processInstance"});
    return data;
});
