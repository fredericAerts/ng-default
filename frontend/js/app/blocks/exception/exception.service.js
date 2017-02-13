/*  Service for catching and reacting to exceptions
    from calls that you know may throw one.
    For example, when making an XHR call to retrieve data
    from a remote web service and you want to catch any
    exceptions from that service and react uniquely.
    ========================================================= */
(() => {
  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception(logger) {
    const service = {
      httpCatcher,
    };
    return service;

    function httpCatcher(message) {
      return (reason) => {
        logger.debug(angular.toJson(reason), '\n', message);
      };
    }
  }
})();
