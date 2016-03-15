
angular.module('app').service("scrollService",[ '$document', function($document) {
	var lastX = 0;
	var lastY = 0;
	$document.bind('touchstart', function(e){//primera posición para touchmove
       	lastY = e.changedTouches[0].clientY;
		lastX = e.changedTouches[0].clientX;
	});	
	return {
		getDirectionOnMouseWheel : getDirectionOnMouseWheel,
		getDirectionOnTouchMove : getDirectionOnTouchMove
	};

	function getDirectionOnMouseWheel(e){//mouseScroll up or down
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        direction = (delta < 0) ?  "down" :   "up";
        return direction;
	}
	function getDirectionOnTouchMove(e){//mobileTouchMove up down left right
		var direction = null;
		var currentY = e.changedTouches[0].clientY;
		var currentX = e.changedTouches[0].clientX;

		//Distancia recorrida
		var pathY = lastY - currentY;
		var pathX = lastX - currentX;

		//Ajustar la sensibilidad (0 siempre up/down, 1 muy sensible a left/right)
		var adjustment = 0.7;

		if(Math.abs(pathY) > (Math.abs(pathX)*adjustment)){//vertical
			direction = (pathY < 0) ?  "up" :   "down";
		}else {											   //horizontal
			direction = (pathX < 0) ?  "left" :   "right";
		}

        lastX = currentX;
        lastY = currentY;
        return direction;

	}

}]);
