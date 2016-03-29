angular.module('app')
    .directive('resize' , ['$window', '$timeout', 'deviceDetector', function($window, $timeout, deviceDetector) {
        return {
            link : function (scope, element, attr) {
                scope.deviceDetector=deviceDetector;
                if(scope.deviceDetector.isDesktop()) {

                    var resizeStop;
                    var resizeOn = true;

                    angular.element($window).on('resize' , function() {
                        if(resizeOn) { begin(); }
                        resizeOn = false;
                        $timeout.cancel(resizeStop);
                        resizeStop = $timeout(end, 500);
                    });
                }

                function begin() {
                    console.log("start");
                }   

                function end() {
                    console.log("end");
                    resizeOn = true;
                }
            }
        };
    }]);

