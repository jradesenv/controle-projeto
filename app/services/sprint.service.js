(function () {
    'use strict';

    angular.module('app.services')
        .factory('sprintService', SprintService)

    function SprintService($log, $q, $timeout) {

        var self;

        return self = {
            listPorProjeto: listPorProjeto
        };

        function listPorProjeto(projeto) {
            var deferred = $q.defer();

            $timeout(function () {

                var Sprint = function (nome) {

                    return {
                        nome: nome
                    };
                }

                var projetoId = projeto.nome.split(" ")[1];
                
                var sprintList = [
                    Sprint("Sprint " + projetoId + "1"),
                    Sprint("Sprint " + projetoId + "2"),
                    Sprint("Sprint " + projetoId + "3"),
                    Sprint("Sprint " + projetoId + "4")
                ];

                deferred.resolve(sprintList);
                
            }, 1000);

            return deferred.promise;
        }

    }

})();