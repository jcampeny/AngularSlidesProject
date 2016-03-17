
var app = angular.module("app",['templates-dist', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'angular-gestures'])
.controller("mainController", [ '$scope', 'ArrayService', '$document', 'scrollService','$state','stateSection','$animate', function($scope, ArrayService, $document, scrollService,$state,stateSection, $animate) {
	var direction = null;
	var states = stateSection.getStates();

	var loop = false;
	$document.bind('mousewheel', function(e){
        direction = scrollService.getDirectionOnMouseWheel(e);
        moveContent(direction);			
	});
	$document.bind('touchmove', function(e){
        direction = scrollService.getDirectionOnTouchMove(e);
        moveContent(direction);
	});	

	function moveContent(direction){
		var state = stateSection.getStatePosition($state.current.url, states);
		if(!stateSection.isMoving() && letScroll(state, direction)){
			stateSection.setMoving(true);
			stateSection.stateGo(state, direction, loop);
		}
	}

	function letScroll(state, direction){
		var canScroll = true;
		if(state.previous === undefined && direction == "up"){canScroll = false;}
		if(state.next === undefined && direction == "down"){canScroll = false;}
		return canScroll;
	}

}])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$resourceProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider, $resourceProvider, $httpProvider) {
		$urlRouterProvider.otherwise("/section1");
		$stateProvider
			.state('app', {url:'/', templateUrl: '../app/core/main.html', abstract: true})
			.state('app.section1', {url:'section1', template: '<app-section></app-section>', resolve: {sValue: function() {return {section : "section1", enter:"vertical", leave:"vertical"};}}, controller: function($scope, sValue) {$scope.sValue = sValue;}})
			.state('app.section2', {url:'section2', template: '<app-section></app-section>', resolve: {sValue: function() {return {section : "section2", enter:"vertical", leave:"vertical"};}}, controller: function($scope, sValue) {$scope.sValue = sValue;}})
			.state('app.section3', {url:'section3', template: '<app-section></app-section>', resolve: {sValue: function() {return {section : "section3", enter:"vertical", leave:"vertical"};}}, controller: function($scope, sValue) {$scope.sValue = sValue;}})
			.state('app.section4', {url:'section4', template: '<app-section></app-section>', resolve: {sValue: function() {return {section : "section4", enter:"vertical", leave:"vertical"};}}, controller: function($scope, sValue) {$scope.sValue = sValue;}});
 
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

app.animation('.section-container', ['stateSection','animationService' , function(stateSection, animationService ) {
	return {

		enter: function(element, doneFn) {
			var type = getType(element);
			var direction = stateSection.getDirection();
			animationService.animateEnter(element, type, direction, function callBack() {doneFn();});

		},

		move: function(element, doneFn) {

		},

		leave: function(element, doneFn) {
			var type = getType(element);
			var direction = stateSection.getDirection();
			animationService.animateLeave(element, type, direction, function callBack() {doneFn();stateSection.setMoving(false);});
			
		}
	};

	function getType(e) {
		var type = {
			enter : "",
			leave : ""
		};
		type.enter = jQuery(e).attr("enter");
		type.leave = jQuery(e).attr("leave");
		return type;
	}
}]);