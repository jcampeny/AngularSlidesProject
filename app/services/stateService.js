angular.module('app')
.service("stateSection", ["$state", function($state){
	var moving = false;
	var direction;
	var sectionsUsing = {
		actual : "",
		next : ""
	};
	return{
		getStates : getStates,
		getStatePosition : getStatePosition,
		stateGo : stateGo,
		isMoving : isMoving,
		setMoving : setMoving,
		getDirection : getDirection,
		setDirection : setDirection
	};
 
	function getDirection(){
		return direction;
	}
	function setDirection(d){
		direction = d;
	}


	function isMoving(){
		return moving;
	}
	function setMoving(mv){ 
		moving = mv;
	}

	function getStates() {
		var states = $state.get();
		var sections = [];
		var subsections = "";
		var i = 0;
		angular.forEach(states, function(value, key) {
				if(typeof value.resolve == 'object'){
					if(typeof value.parent == 'object'){
						subsections.parent["subsection"+i] = value.resolve.sValue();
					}else{ 
						var s;
						if(subsections !== ""){
							s = subsections;
							subsections = "";
							sections.push(s);
						}else{
							s = value.resolve.sValue();
							sections.push(s.section);
						}				 
					}
				}else {
					if(typeof value.params == 'object'){
						subsections.parent = value.url;
					}
				} 
		});

		return sections;
	}
	function getStatePosition(currentState, states) {
		var position = {};
		var actualState = currentState.url;			
		angular.forEach(states, function(e,i){
			if(actualState == e){ //estado sin subsecciones
				position.current = states[i];
				position.previous = states[i-1];
				position.next = states[i+1];
			}else if(currentState.params !== undefined && currentState.params.parentName !== undefined){ //si tiene parent es una subsección
				var constructState = currentState.params.parentName +"."+actualState.substr(1); //creamos el string para poder comparar con el objeto creado anteriormente
				if(constructState == e){
					position.current = states[i];
					position.previous = states[i-1];
					position.next = states[i+1];					
				}
			}
		}); 

		return {
			previous : position.previous,
			current : position.current,
			next : position.next
		};
	}
	function stateGo(currentPosition, direction, loop){
		if(loop){//infinite loop
			//TODO
		}else {//normal (without loop)
			if(direction == "up"){
				if(currentPosition.previous !== undefined){$state.go('app.'+currentPosition.previous);}
			}
			if(direction == "down"){
				if(currentPosition.next !== undefined){$state.go('app.'+currentPosition.next);}
			}
			//todo other direction
		}
		setDirection(direction);
	}

}]);
