marijkeApp.directive("navbar", ["TEMPLATES_ROOT", "$window", function(TEMPLATES_ROOT, $window) {
	return {
		restrict: "E",
		replace: true,
		link: function(scope) {
			angular.element($window).bind('resize', function() {
				scope.$apply("closeNav()");
			});
		},
		templateUrl: TEMPLATES_ROOT + "navbar.html"
	};
}]);