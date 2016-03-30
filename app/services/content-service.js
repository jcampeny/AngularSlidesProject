
angular.module('app').service("contentService",['$state', function( $state ) {
		var JsonContent = {
			section1 : {
				title : "H1",
				subtitle : "h2"
			},
			section2 : {
				title : "H1",
				subtitle : "h2"
			},
			section3 : {
				title : '1.',
				subtitle : 'Entorno de mercado',
				img : '../url.png'
			}
		};
	    return({
			getData: getData
		});

		function getData(){
			var section = $state.current.url;

			return JsonContent[section];
	    }

	}]);
