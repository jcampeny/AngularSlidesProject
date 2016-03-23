angular.module('app').directive('loadingPage', function ($animate) {
  return {
    restrict: 'C',
    link : function ($scope, element) {
        $scope.loadingState = "loaded";
    }
  };
});
