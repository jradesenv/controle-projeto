(function () {
    'use strict';

    angular.module('app.services')
        .factory('loginService', LoginService)

    function LoginService($log, $q, $timeout) {

        var self;

        return self = {
            efetuarLogin: efetuarLogin
        };

        function efetuarLogin(urlServidor, email, senha) {
            var deferred = $q.defer();

            /*
            var urlLogin = urlServidor //validar url e concatenar o resto

            $http.get(urlLogin)
                .success(function(usuario) { 

                    deferred.resolve(usuario);

                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            */

            //mock
            $timeout(function () {
                if (urlServidor != "localhost:8080/tfs") {
                    deferred.reject("Url informada está incorreta.");
                } else if (email != "emailteste" || senha != "senhateste") {
                    deferred.reject("E-mail e/ou senha inválidos.");
                } else {
                    var usuario = {
                        nome: "Jean Robert",
                        email: email
                    };

                    deferred.resolve(usuario);
                }
            }, 1000);

            return deferred.promise;
        }

    }

})();