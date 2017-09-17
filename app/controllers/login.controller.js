(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('loginController', LoginController)

    function LoginController($state, $rootScope, loginService) {
        var vm = this;
        vm.login = login;
        vm.formData = {
            urlServidor: "",
            email: "",
            senha: ""
        };

        function login() {
            console.log(vm.formData);
            $rootScope.isLoading = true;

            var loginPromise = loginService.efetuarLogin(vm.formData.urlServidor, vm.formData.email, vm.formData.senha);
            loginPromise.then(function(usuario) {
                $rootScope.isLoading = false;
                $state.go('home.kanban');
                
            }, function(errorMessage) {
                $rootScope.isLoading = false;
                alert(errorMessage);

            });
            
            
            //
        }
    }

})();