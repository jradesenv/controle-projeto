(function () {
    'use strict';

    angular.module('app.services')
        .factory('projetoService', ProjetoService)

    function ProjetoService($log, $q, $timeout) {

        var self;

        return self = {
            list: list
        };

        function list() {
            var deferred = $q.defer();

            $timeout(function () {

                var Projeto = function (nome) {

                    return {
                        nome: nome
                    };
                }
                
                var projetoList = [
                    Projeto("Projeto 1"),
                    Projeto("Projeto 2"),
                    Projeto("Projeto 3"),
                    Projeto("Projeto 4")
                ];

                deferred.resolve(projetoList);
                
            }, 1000);

            return deferred.promise;
        }

    }

})();