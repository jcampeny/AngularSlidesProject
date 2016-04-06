var svgEkd = angular.module('svgEkd', []);

//DIRECTIVES

svgEkd.directive('svgContainer', ['svgService','$window', function(svgService, $window) {
	return{
		restrict : 'E',
		scope : {
			name: '@'//nombre del archivo svg
		},
		link : function(s, e, a) {

			svgService.setSizeToSvg(e);

			angular.element($window).on('resize' , function() {
                svgService.setSizeToSvg(e);
            });
			
		},
		templateUrl : function(e, a) {
			return '../app/components/directives/'+a.name+'.svg';
		},
		controller : ["$scope", function($scope) {}]
	};
}]);

svgEkd.directive('circle', ['svgService', function(svgService) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			if(s.animation != "false" && !e.parent().attr("stagger")){
				var time = s.time || 1;
				var delay = s.delay || 0;
				svgService.circleAnimation(e, a, time, delay, s.direction);
			}
		}
	};
}]);

svgEkd.directive('line', ['svgService', function(svgService) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			if(s.animation != "false" && !e.parent().attr("stagger")){
				var time = s.time || 1;
				var delay = s.delay || 0;
				svgService.lineAnimation(e, a, time, delay, s.direction);
                
			}
		}
	};
}]);

svgEkd.directive('path', ['svgService', function(svgService) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			
			if(s.animation != "false" && !e.parent().attr("stagger")){
				var time = s.time || 1;
				var delay = s.delay || 0;
				svgService.pathAnimation(e, a, time, delay, s.direction);
                
			}
		}
	};
}]);

svgEkd.directive('polyline', ['svgService', function(svgService) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			
			if(s.animation != "false" && !e.parent().attr("stagger")){
				var time = s.time || 1;
				var delay = s.delay || 0;
				svgService.polyLineAnimation(e, a, time, delay, s.direction);
                
			}
		}
	};
}]);
svgEkd.directive('polygon', ['svgService', function(svgService) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			
			if(s.animation != "false" && !e.parent().attr("stagger")){
				var time = s.time || 1;
				var delay = s.delay || 0;
				
				svgService.polygonAnimation(e, a, time, delay, s.direction);
                
			}
		}
	};
}]);
svgEkd.directive('rect', ['svgService', function(svgService) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			
			if(s.animation != "false" && !e.parent().attr("stagger")){
				var time = s.time || 1;
				var delay = s.delay || 0;
				var direction = s.direction || "up";

				svgService.rectAnimation(e, a, time, delay, direction);
				
                
			}
		}
	};
}]);
svgEkd.directive('g', ['svgService', '$interval', function(svgService, $interval) {
	return{
		restrict : 'E',
		require: '^^svgContainer',
		scope : {
			animation : "@",
			time : "@",
			delay : "@",
			direction : "@"
		},
		link: function (s, e, a){
			if(a.stagger){
				var time = s.time || 1;
				var delay = s.delay || 0;
				rect = e.find('rect');
				if(rect){
					svgService.staggerRect(rect, time, delay, s.direction);
				}
			}

			
		}
	};
}]);
//SERVICES

svgEkd.service('svgService', function($interval) {

	function animateDash(path, e, time, delay, direction){
		path = (direction=="reverse") ? -(path) : path;
		var start = {//start state
			"stroke-dashoffset": path,
			"stroke-dasharray": Math.abs(path)
		};
		var end = { //end state
			"stroke-dashoffset": '0', 
			delay: delay 
		};

		TweenLite.fromTo(e, time, start, end);

	}
	function calculatePathPoly(e){
		var points = e.attr('points');
        points = points.split(" ");
        var x1 = null, x2, y1 = null, y2 , path = 0, x3, y3;
        for(var i = 0; i < points.length-1; i++){
            var coords = points[i].split(",");
            if(x1 === null && y1 === null && coords[0] !== ""){
                if(/(\r\n|\n|\r)/gm.test(coords[0])){
                    coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm,"");
                    coords[0] = coords[0].replace(/\s+/g,"");
                }

                if(/(\r\n|\n|\r)/gm.test(coords[1])){
                    coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm,"");
                    coords[0] = coords[1].replace(/\s+/g,"");
                }

                x1 = coords[0];
                y1 = coords[1];
                x3 = coords[0];
                y3 = coords[1];

            }else{

                if(coords[0] !== "" && coords[1] !== "" && coords[0] !== ""){             

                    if(/(\r\n|\n|\r)/gm.test(coords[0])){
                        coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm,"");
                        coords[0] = coords[0].replace(/\s+/g,"");
                    }

                    if(/(\r\n|\n|\r)/gm.test(coords[1])){
                        coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm,"");
                        coords[0] = coords[1].replace(/\s+/g,"");
                    }

                    x2 = coords[0];
                    y2 = coords[1];

                    path += Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));

                    x1 = x2;
                    y1 = y2;
                    if(i == points.length-2){
                        path += Math.sqrt(Math.pow((x3-x1), 2)+Math.pow((y3-y1),2));
                    }
                }
            }
        }   
        return path;  
	}

	return {
		setSizeToSvg : setSizeToSvg,
		rectAnimation : rectAnimation,
		circleAnimation : circleAnimation,
		lineAnimation : lineAnimation,
		pathAnimation : pathAnimation,
		polyLineAnimation : polyLineAnimation,
		polygonAnimation : polygonAnimation,
		staggerRect : staggerRect

	};

	function setSizeToSvg(e){
			var svg = e.find("svg");
			var w = $(e).width();
			var h = $(e).height();

			$(svg[0]).attr({
				width : w,
				height : h});
	}
	function staggerRect(e, t, d, dir) {
		var direction = dir || "up";
		var i = 0;
		TweenLite.set(e, {scaleY: 0});
		var animateRect = $interval(function() {
			if(e[i] !== undefined){
				var a = {
					height : $(e[i]).attr("height"),
					width : $(e[i]).attr("width")
				};
				rectAnimation(e[i], a, t, 0, direction);
				i++;
			}else {
				$interval.cancel();
			}
		}, (d*1000));
	}
	function rectAnimation(e, a, time, delay, direction) {
		var y = a.height;
		var x = a.width;

		switch(direction) {
		    case "up":
		        TweenLite.fromTo(e, time, {scaleY: '0', y: y}, {scaleY: 1, y:0 , delay: delay}); 
		        break;
		    case "down":
		        TweenLite.fromTo(e, time, {scaleX: '0'}, {scaleY: 1, delay: delay});
		        break;
		    case "left":
		        TweenLite.fromTo(e, time, {scaleX: '0', x: x}, {scaleX: 1, x:0 , delay: delay}); 
		        break;
	        case "right":
	            TweenLite.fromTo(e, time, {scaleX: '0'}, {scaleX: 1, delay: delay});
	            break;
		}
	}
	function circleAnimation(e, a, time, delay, direction){
		var radius = a.r;
		var perimeter = 2*Math.PI*radius;

		animateDash(perimeter, e, time, delay, direction);

	}

	function lineAnimation(e, a, time, delay, direction){
		var cx = a.x1 - a.x2;
		var cy = a.y1 - a.y2;
		var path = Math.sqrt(Math.pow(cx,2) + Math.pow(cy,2));

		animateDash(path, e, time, delay, direction);
	}

	function pathAnimation(e, a, time, delay, direction){
		var path = e[0].getTotalLength();

		animateDash(path, e, time, delay, direction);
	}
	function polyLineAnimation(e, a, time, delay, direction){
		var path = calculatePathPoly(e);

		animateDash(path, e, time, delay, direction);
	}
	function polygonAnimation(e, a, time, delay, direction){
		var path = calculatePathPoly(e);

		animateDash(path, e, time, delay, direction);
		//todo FILL
	}
});