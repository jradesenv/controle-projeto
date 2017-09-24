(function(){
    'use strict';

    function boot() {
        angular.bootstrap(document, ['app']);
    }
    
    document.addEventListener('DOMContentLoaded', boot);
    
    angular.module('app.services', []);
    angular.module('app.directives', ['app.services']);
    angular.module('app.controllers', ['app.directives']);

    angular.module('app', [
        'ui.mask',
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'ngMessages',
        "dndLists",
        'ui.router.default',
        'app.controllers'
    ]).run(function($state, $rootScope) {
        $rootScope.logout = logout;
        $rootScope.isLoading = false;

        function logout() {
            $state.go('login');
        }
    });    

    //prevent redirect from dragndrop
    document.addEventListener('dragover', function (event) {
        event.preventDefault();
        return false;
    }, false);
    
    document.addEventListener('drop', function (event) {
        event.preventDefault();
        return false;
    }, false);
    
})();