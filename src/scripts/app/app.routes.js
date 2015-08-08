marijkeApp.config(["$routeProvider", "VIEWS_ROOT", function($routeProvider, VIEWS_ROOT) {
	$routeProvider
	.when('/',
		{
			redirectTo:"/home"
		}
	)
	.when('/home',
		{
			templateUrl:VIEWS_ROOT + "home.html"
		}
	)
	.when('/natuurlijke-voeding',
		{
			templateUrl:VIEWS_ROOT + "natuurlijke-voeding.html"
		}
	)
	.when('/via-de-voeten',
		{
			templateUrl:VIEWS_ROOT + "via-de-voeten.html"
		}
	)
	.otherwise(
		{
			templateUrl:VIEWS_ROOT + "home.html"
		}
	);
}]);