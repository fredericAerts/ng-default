(() => {
  angular
    .module('ng-default')
    .config(configure);

  configure.$inject = ['$provide'];

  function configure($provide) {
    // extend default exceptionHandler
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  extendExceptionHandler.$inject = ['$delegate', '$log'];

  function extendExceptionHandler($delegate, $log) {
    return (exception, cause) => {
      $delegate(exception, cause);
      const errorData = {
        exception,
        cause,
      };

      $log.log(errorData);
      /**
        * Could add the error to a service's collection,
        * add errors to $rootScope, log errors to remote web server,
        * or log locally. Or throw hard. It is entirely up to you.
        * throw exception;
      */
    };
  }
})();
