
angular.module('app').service("animationService",[function() {
	var animationsOutLibrary = {
		"up" : outUp
	};
	var animationsInLibrary = {
		"in" : inIn
	};
	return {
		animateOut : animateOut,
		animateIn : animateIn
	};

	function animateOut(e, type, callBack){
		animationsOutLibrary[type](e,callBack);
	}
	function animateIn(e, type, callBack){
		animationsInLibrary[type](e,callBack);
	}

	/*ANIMACIONES DE SALIDA*/
	function outUp(e, callBack){
		TweenMax.set(e, { top: 0});
		TweenMax.to(e, 1, { top: '-100%', onComplete: callBack });
	}

	/*ANIMACIONES DE ENTRADA*/
	function inIn(e, callBack){
		TweenMax.set(e, { opacity: 0, scale: 0.0 });
		TweenMax.to(e, 1, { opacity: 1, scale: 1.0, onComplete: callBack  });
	}

}]);
