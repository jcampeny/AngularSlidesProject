angular.module('app').directive('appSection', function () {
  return {
    restrict: 'E',
    templateUrl: '../app/components/section/section.html',
    controllerAs: 'appSection',
    controller: function ($scope) {
    	var stateSection = $scope.sValue;
    	$scope.bgColor = "bg-color-"+stateSection.section;

    }
  };
});
