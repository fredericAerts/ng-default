(() => {
  angular
    .module('blocks.exception')
    .config(exceptionHandlerConfig);

  /* @ngInject */
  function exceptionHandlerConfig($provide) {
    // extend default exceptionHandler
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  /* @ngInject */
  function extendExceptionHandler($delegate, logger) {
    return (exception, cause) => {
      $delegate(exception, cause);
      const errorData = {
        exception,
        cause,
      };
      /**
        * Could add the error to a service's collection,
        * add errors to $rootScope, log errors to remote web server,
        * or log locally. Or throw hard. It is entirely up to you.
        * throw exception;
      */
      logger.log('error data: ', errorData);
    };
  }
})();
