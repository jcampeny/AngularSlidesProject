angular.module('app')
    .directive('headerDirective',function(contentService) {
        return {
            restrict: 'E',
            templateUrl : '../app/components/directives/header.html',
            link : function(scope, element, attr) {
                scope.content = contentService.getData();
            }
        };
    });

