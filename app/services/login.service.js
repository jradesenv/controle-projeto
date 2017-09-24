(function () {
    'use strict';

    angular.module('app.services')
        .factory('loginService', LoginService)

    function LoginService($log, $q, $timeout) {

        var self;

        return self = {
            doLogin: doLogin
        };

        function doLogin(serverUrl, username, password) {
            var deferred = $q.defer();

            /*
            var urlLogin = serverUrl //validar url e concatenar o resto

            $http.get(urlLogin)
                .success(function(user) { 

                    deferred.resolve(user);

                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            */

            //mock
            $timeout(function () {
                if (serverUrl != "localhost:8080/tfs") {
                    deferred.reject("Url informada está incorreta.");
                } else if (username != "emailteste" || password != "senhateste") {
                    deferred.reject("Usuário e/ou senha inválidos.");
                } else {
                    var user = {
                        name: "Jean Robert",
                        username: username
                    };

                    deferred.resolve(user);
                }
            }, 3000);

            return deferred.promise;
        }

    }

})();