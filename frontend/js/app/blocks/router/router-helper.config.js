(() => {
  angular
    .module('blocks.router')
    .provider('routehelperConfig', routehelperConfig)
    .factory('routehelper', routehelper);

  // Must configure via the routehelperConfigProvider
  function routehelperConfig() {
    this.config = {
      // These are the properties we need to set
      $routeProvider: undefined,
      resolveAlways: {},
    };

    this.$get = () => ({
      config: this.config,
    });
  }

  /* @ngInject */ // eslint-disable-next-line no-shadow
  function routehelper($location, $rootScope, $route, logger, routehelperConfig) {
    let handlingRouteChangeError = false;
    const routeCounts = {
      errors: 0,
      changes: 0,
    };
    const routes = [];
    const $routeProvider = routehelperConfig.config.$routeProvider;

    const service = {
      configureRoutes,
      getRoutes,
      routeCounts,
    };

    init();

    return service;

    /* @ngInject */ // eslint-disable-next-line no-shadow
    function configureRoutes(routes) {
      routes.forEach((route) => {
        // eslint-disable-next-line no-param-reassign
        route.config.resolve =
          angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
        $routeProvider.when(route.url, route.config);
      });
      $routeProvider.otherwise({ redirectTo: '/' });
    }

    function handleRoutingErrors() {
      // Route cancellation:
      // On routing error, go to the dashboard.
      // Provide an exit clause if it tries to do it twice.
      // eslint-disable-next-line angular/on-watch
      $rootScope.$on('$routeChangeError',
        (event, current, previous, rejection) => {
          if (handlingRouteChangeError) {
            return;
          }
          routeCounts.errors += 1;
          handlingRouteChangeError = true;
          const destination = (current && (current.title || current.name ||
            current.loadedTemplateUrl)) || 'unknown target';
          const msg = `Error routing to ${destination}. ${(rejection.msg || '')}`;
          logger.warning(msg, [current]);
          $location.path('/');
        },
      );
    }

    function init() {
      handleRoutingErrors();
    }

    function getRoutes() {
      Object.keys($route.routes).forEach((key) => {
        const route = $route.routes[key];
        routes.push(route);
      });
      return routes;
    }
  }
})();
