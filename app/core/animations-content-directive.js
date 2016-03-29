angular.module('app').directive('animationIn', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        scope : {
            type : '@',
            delay : '@'
        },
        link : function(scope, element, attr) {
            console.log(scope.delay);
            $timeout(function() {
                element.addClass(scope.type);                
            },scope.delay*1000);
        }
    };
}]);