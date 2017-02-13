(() => {
  angular
    .module('app.core')
    .factory('common', common);

  /* @ngInject */
  function common($rootScope, $q) {
    const service = {
      $rootScope,
      $q,
    };

    return service;
  }
})();
