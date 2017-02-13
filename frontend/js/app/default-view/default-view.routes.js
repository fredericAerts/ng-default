(() => {
  angular
    .module('app.default-view')
    .run(appRun);

  /* @ngInject */
  function appRun(TEMPLATES_ROOT, routehelper) {
    routehelper.configureRoutes(getRoutes(TEMPLATES_ROOT));
  }

  function getRoutes(TEMPLATES_ROOT) {
    return [
      {
        url: '/',
        config: {
          templateUrl: `${TEMPLATES_ROOT}/default-view/default-view.html`,
          controller: 'DefaultViewController',
          controllerAs: 'defaultView',
        },
      },
    ];
  }
})();
