/*angular.module('app').directive('appSubSection', function () {
  return {
    restrict: 'E',
    templateUrl: '../app/components/section/subSection.html',
    controllerAs: 'appSubSection',
    controller: function ($scope) {
        var stateSection = $scope.sValue;
        stateSection.section = stateSection.section.replace(/\./g,'-');
        $scope.bgColor = "bg-color-"+stateSection.section;
        $scope.state = stateSection.section;
        $scope.in = stateSection.enter;
        $scope.out = stateSection.leave;
        $scope.$parent.in =  $scope.$parent.enter;
        $scope.$parent.out = $scope.$parent.leave;
        $scope.$parent.$bgColor = $scope.$parent.$state;
    }
  };
});
*/

angular.module('app')
    .controller('appSubSection', ['$scope', 'sValue', function($scope, sValue) {
            var stateSection = sValue;
            stateSection.section = stateSection.section.replace(/\./g,'-');
            $scope.bgColor = "bg-color-"+stateSection.section;
            $scope.state = stateSection.section;
            $scope.in = stateSection.enter;
            $scope.out = stateSection.leave;
            $scope.$parent.in =  $scope.$parent.enter;
            $scope.$parent.out = $scope.$parent.leave;
            $scope.$parent.$bgColor = $scope.$parent.$state;
        }]); 