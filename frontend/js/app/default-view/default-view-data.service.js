(() => {
  angular
    .module('app.default-view')
    .factory('defaultViewDataService', defaultViewDataService);

  /* @ngInject */
  function defaultViewDataService(DATA_URL,
    $http,
    exception) {
    const service = {
      getDefaultViewMessage,
    };

    return service;

    function getDefaultViewMessage() {
      return $http({
        method: 'GET',
        url: DATA_URL,
      })
      .then(getDefaultViewMessageSuccess)
      .catch(getDefaultViewMessageError)
      .finally(getDefaultViewMessageCompleted);

      function getDefaultViewMessageSuccess(response) {
        return response.data;
      }

      function getDefaultViewMessageError(response) {
        exception.httpCatcher('Error retrieving default message')(response);

        return 'error';
      }

      function getDefaultViewMessageCompleted() {

      }
    }
  }
})();
