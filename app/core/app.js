
var app = angular.module("app",['templates-dist', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'angular-gestures'])
.controller("mainController", [ '$scope', 'ArrayService', '$document', 'scrollService','$state', function($scope, ArrayService, $document, scrollService,$state) {
	var direction = 0;
	$document.bind('mousewheel', function(e){
        direction = scrollService.getDirectionOnMouseWheel(e);
        HARDCORESCROLL(direction);
	});
	$document.bind('touchmove', function(e){
        direction = scrollService.getDirectionOnTouchMove(e);
        HARDCORESCROLL(direction);
	});	

	function HARDCORESCROLL(direction){
		if(direction == "up"){
			$state.go('app.section1');
		}else {
			$state.go('app.section2');
		}
	}
}])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$resourceProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider, $resourceProvider, $httpProvider) {
		$urlRouterProvider.otherwise("/section1");
		$stateProvider
			.state('app', {url:'/', templateUrl: '../app/core/main.html', abstract: true})
			.state('app.section1', {url:'section1', template: '<app-section></app-section>', resolve: {sValue: function() {return {section : "section1", transitionIn:"down", transitionOut:"up"};}}, controller: function($scope, sValue) {$scope.sValue = sValue;}})
			.state('app.section2', {url:'section2', template: '<app-section></app-section>', resolve: {sValue: function() {return {section : "section2", transitionIn:"down", transitionOut:"up"};}}, controller: function($scope, sValue) {$scope.sValue = sValue;}});
 
		$locationProvider.html5Mode(true);
		$resourceProvider.defaults.stripTrailingSlashes = false;

}])
.constant("APPLICATION_CONFIG", {
    "NAME": "ANGULAR_SLIDES"
})
.constant("API_CONFIG", {
    "BASE_URL": ""
})
.run(['$rootScope', '$location', '$window', '$state', function($rootScope, $location, $window, $state){
     $rootScope.$on('$stateChangeSuccess',
        function(event){
            if (!$window.ga)
            return;
            //$window.ga('send', 'pageview', { page: $location.path() });
    });

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {

	});

}]);

