angular.module('app')
    .directive('subFrontPage',function(contentService) {
        return {
            restrict: 'E',
            templateUrl : '../app/components/directives/subfront.html',
            link : function(scope, element, attr) {
                scope.content = contentService.getData();
            }
        };
    });

