
(() => {
  angular
    .module('app.core')
    .config(configure);

  /* @ngInject */
  function configure($logProvider, $routeProvider, routehelperConfigProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);

    // Configure the common route provider
    // eslint-disable-next-line no-param-reassign
    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    // eslint-disable-next-line no-param-reassign
    routehelperConfigProvider.config.resolveAlways = {};
  }
})();
