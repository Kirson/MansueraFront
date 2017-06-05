(function () {
    'use strict';
    angular.module('ValidationDirectives').directive('tntNifValidation', [
        function() {
            return {
                restrict: 'A',
                link: function(scope, ele, attrs) {
                    return Holder.run({
                        images: ele[0]
                    });
                }
            };
        }
    ])
})(); 