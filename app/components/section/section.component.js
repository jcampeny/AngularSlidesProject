/*angular.module('app').directive('appSection', function () {
  return {
    restrict: 'E',
    templateUrl: '../app/components/section/section.html',
    controllerAs: 'appSection',
    controller: function ($scope) {
    	var stateSection = $scope.sValue;
    	$scope.bgColor = "bg-color-"+stateSection.section;
    	$scope.state = stateSection.section;
    	$scope.in = stateSection.enter;
    	$scope.out = stateSection.leave;
    }
  };
});
*/
angular.module('app')
    .controller('appSection', ['$scope', 'sValue', function($scope, sValue) {
            var stateSection = sValue;
            $scope.bgColor = "bg-color-"+stateSection.section;
            $scope.state = stateSection.section;
            $scope.in = stateSection.enter;
            $scope.out = stateSection.leave;        
        }]);