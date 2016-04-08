/*  Service for catching and reacting to exceptions
    from calls that you know may throw one.
    For example, when making an XHR call to retrieve data
    from a remote web service and you want to catch any
    exceptions from that service and react uniquely.
    ========================================================= */
(function() {
    angular
        .module('ng-default')
        .factory('exception', exception);

    exception.$inject = ['$log'];

    function exception($log) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                // TODO: implement user friendly error messaging here
                $log.log(message, reason);
            };
        }
    }
})();
