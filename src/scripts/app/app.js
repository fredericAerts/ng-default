var marijkeApp = angular.module('marijkeApp', ['ngRoute', 'ngAnimate', 'ng.picturefill']);

//paths
marijkeApp.paths = {
    templatesRoot: "/web/scripts/templates/",
    viewsRoot: "/views/",
};

marijkeApp.constant("TEMPLATES_ROOT", marijkeApp.paths.templatesRoot);
marijkeApp.constant("VIEWS_ROOT", marijkeApp.paths.viewsRoot);