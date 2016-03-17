
angular.module('app').service("animationService",[function() {
	var animationLibrary = {
		enter : {
			vertical : fromBottom,
			upvertical : fromTop,
			horizontal : fromRight,
			uphorizontal : fromLeft,
			fade : fadeIn,
			upfade : fadeIn	
		}, 
		leave : {
			vertical : toTop,
			upvertical : toBottom,
			horizontal : toLeft,
			uphorizontal : toRight,
			fade : fadeOut,
			upfade : fadeOut
		}
	};
	var timeTransition = 1; //en segundos
	return {
		animateEnter : animateEnter,
		animateLeave : animateLeave
	};

	/* 
		e: elemento  
		type: es un objeto con dos valores (enter y leave) que coge los valores de enter y leave del resolve
		direction : dirección del scroll
		callback : callback de la animación
	*/
	function animateEnter(e, type, direction, callBack){//función llamada desde app.animation
		var animation = "enter";
		if(type.enter == type.leave){
			sameAnimationForBoth(e, type, animation, direction, callBack);
		}else {
			differentAnimationForBoth(e, type, animation, direction, callBack);
		}
	}
	function animateLeave(e, type, direction, callBack){//función llamada desde app.animation
		var animation = "leave";
		if(type.enter == type.leave){
			sameAnimationForBoth(e, type, animation, direction, callBack);
		}else {
			differentAnimationForBoth(e, type, animation, direction, callBack);
		}
	}

	/*
		animation: su valor será "enter" si es llamado desde animateEnter o leave si es llamado desde animateLeave
	*/
	function sameAnimationForBoth(e, type, animation, direction, callBack){//enter y leave de los resolve iguales
		if(direction == "down"){
			animationLibrary[animation][type[animation]](e,callBack);	
		}else {
			animationLibrary[animation]["up"+type[animation]](e,callBack);
		}
	}
	function differentAnimationForBoth(e, type, animation, direction, callBack){//enter y leave de los resolve diferentes
		if(direction == "down"){
			animationLibrary[animation][type[animation]](e,callBack);	
		}else {
			animationLibrary[animation]["up"+type[(animation == "enter") ? "leave" : "enter"]](e,callBack);
		}
	}
/*--ANIMATIONS-------------*/
/*----ENTER---------------*/
	function fromTop(e, callBack){
		TweenMax.set(e, { top: '-100%'});
		TweenMax.to(e, timeTransition, { top: '0%', onComplete: callBack });
	}
	function fromBottom(e, callBack){
		TweenMax.set(e, { top: '100%'});
		TweenMax.to(e, timeTransition, { top: '0%', onComplete: callBack });
	}
	function fromRight(e, callBack){
		TweenMax.set(e, { left : '100%'});
		TweenMax.to(e, timeTransition, { left: '0%', onComplete: callBack });
	}
	function fromLeft(e, callBack){
		TweenMax.set(e, { left: '-100%'});
		TweenMax.to(e, timeTransition, { left: '0%', onComplete: callBack });
	}
	function fadeIn(e, callBack){
		TweenMax.set(e, { opacity: '0'});
		TweenMax.to(e, timeTransition, { opacity: '1', onComplete: callBack });
	}
/*----LEAVE---------------*/
	function toTop(e, callBack){
		TweenMax.set(e, { top: '0%'});
		TweenMax.to(e, timeTransition, { top: '-100%', onComplete: callBack });
	}
	function toBottom(e, callBack){
		TweenMax.set(e, { top: '0%'});
		TweenMax.to(e, timeTransition, { top: '100%', onComplete: callBack });
	}
	function toRight(e, callBack){
		TweenMax.set(e, { left: '0%'});
		TweenMax.to(e, timeTransition, { left: '100%', onComplete: callBack });
	}
	function toLeft(e, callBack){
		TweenMax.set(e, { left: '0%'});
		TweenMax.to(e, timeTransition, { left: '-100%', onComplete: callBack });
	}
	function fadeOut(e, callBack){
		TweenMax.set(e, { opacity: '1'});
		TweenMax.to(e, timeTransition, { opacity: '0', onComplete: callBack });
	}
}]);
