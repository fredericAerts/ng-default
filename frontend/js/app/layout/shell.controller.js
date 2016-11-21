(() => {
  angular
    .module('ng-default')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$log'];

  function ShellController($log) {
    const vm = this;

    activate();

    function activate() {
      $log.log(vm);
    }

    /*  Functions
        ================================================ */
  }
})();
