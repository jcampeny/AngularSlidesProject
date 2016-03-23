angular.module('app').directive('loadingPage', function ($animate, preloader) {
  return {
    restrict: 'C',
    link : function ($scope, element) {
    	var loadImages = [
    		'../dist/section4.jpg',
    		'../dist/section2.jpg',
    		'../dist/section3.jpg',
    		'../dist/section1.jpg'
    	];
    	
    	preloader.preload(loadImages ).then(function() {
			$scope.loadingState = "loaded";
		});
        
    }
  };
});
