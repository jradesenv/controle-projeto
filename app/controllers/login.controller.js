(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('loginController', LoginController)

    function LoginController($state, $rootScope, loginService) {
        var vm = this;
        vm.doLogin = doLogin;
        vm.formData = {
            serverUrl: "localhost:8080/tfs",
            username: "emailteste",
            password: "senhateste"
        };

        function doLogin() {
            console.log(vm.formData);
            $rootScope.isLoading = true;

            var loginPromise = loginService.doLogin(vm.formData.serverUrl, vm.formData.username, vm.formData.password);
            loginPromise.then(function(usuario) {
                $rootScope.isLoading = false;
                $state.go('home.kanban');
                
            }, function(errorMessage) {
                $rootScope.isLoading = false;
                alert(errorMessage);

            });
        }
    }

})();