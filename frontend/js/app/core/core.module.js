(() => {
  angular
    .module('app.core', [
      'ngAnimate',
      'blocks.exception',
      'blocks.logger',
      'blocks.router',
      'ngRoute',
    ]);
})();
