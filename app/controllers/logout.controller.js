(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("logoutController", LogoutController);

    function LogoutController($scope, $mdDialog, $rootScope) {
        var vm = this;
        vm.cancel = cancel;
        vm.logout = logout;

        function cancel() {
            $mdDialog.cancel();
        }

        function logout() {
            $mdDialog.cancel();
            $rootScope.logout();
        }
    }

})();