marijkeApp.controller("navbarCtrl", ["$scope", "$location", function navbarCtrl($scope, $location) {
	'use strict';

	$scope.closeNav = function() {
		$scope.navOpen = false;
	};

	$scope.isActiveNav = function (viewLocation) { 
        return viewLocation === $location.path().substring(0, viewLocation.length);
    };
}]);