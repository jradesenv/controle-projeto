(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('loginController', LoginController)

    function LoginController($state) {
        var vm = this;
        vm.login = login;
        vm.formData = null;

        function login() {
            console.log(vm.formData);
            $state.go('home.kanban');
        }
    }

})();