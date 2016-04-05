angular.module('svgEkd', [])
	.directive('svgContainer', ['svgService','$window', function(svgService, $window) {
			return{
				restrict : 'E',
				scope : {
					name: '@'
				},
				link : function(s, e, a) {

					svgService.setSize(e);

					angular.element($window).on('resize' , function() {
                        svgService.setSize(e);
                    });
					
				},
				templateUrl : function(e, a) {
					return '../app/components/directives/'+a.name+'.html';
				}
			};
		}])
	.service('svgService', function() {
		return {
			setSize : setSize
		};

		function setSize(e){
				var svg = e.find("svg");
				var w = $(e).width();
				var h = $(e).height();
				$(svg[0]).attr({
					width : w,
					height : h});
		}
	});