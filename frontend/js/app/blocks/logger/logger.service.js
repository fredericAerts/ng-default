(() => {
  angular
    .module('blocks.logger')
    .factory('logger', logger);

  /* @ngInject */
  function logger($log) {
    const service = {
      log: $log.log,
      error,
      info,
      success,
      warning,
      debug,
    };
    return service;

    function error(message, data) {
      $log.error(`Error: ${message} \n`, data);
    }

    function info(message, data) {
      $log.info(`Info: ${message}`, data || '');
    }

    function success(message, data) {
      $log.success(`Success: ${message}`, data || '');
    }

    function warning(message, data) {
      $log.warn(`Warning: ${message}`, data || '');
    }

    function debug(message, data) {
      $log.debug(`Debug: ${message}`, data || '');
    }
  }
})();
