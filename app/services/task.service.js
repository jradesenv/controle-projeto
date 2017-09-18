(function () {
    'use strict';

    angular.module('app.services')
        .factory('taskService', TaskService)

    function TaskService($log, $q, $timeout) {

        var self;

        return self = {
            list: list,
            listStatus: listStatus
        };

        function listStatus() {
            var deferred = $q.defer();

            $timeout(function () {
                var statusList = [
                    "PROPOSED",
                    "ACTIVED",
                    "RESOLVED",
                    "CLOSED"
                ];
                deferred.resolve(statusList);
            }, 0);

            return deferred.promise;
        }

        function list(projeto, sprint) {
            var deferred = $q.defer();

            $timeout(function () {

                var Task = function (titulo, status, tempoRestante, estadoEstimativa, responsavel) {
                    //Título, Responsável, Tempo restante para conclusão e botão para ver detalhes

                    return {
                        titulo: titulo
                        ,status: status
                        ,tempoRestante: tempoRestante
                        ,estadoEstimativa: estadoEstimativa //LOW, MEDIUM, HIGH, URGENT
                        ,responsavel: responsavel //usuario com imageUrl
                    };
                }

                var nameSufix = projeto.nome.split(" ")[1];
                if (typeof sprint == "object") {
                    nameSufix = sprint.nome.split(" ")[1];
                }
                
                var taskList = [
                    Task("Task " + nameSufix + "1", "PROPOSED", "02:50", "good", "Jean Robert"),
                    Task("Task " + nameSufix + "2", "PROPOSED", "02:50", "good", "Jean Robert"),
                    Task("Task " + nameSufix + "3", "ACTIVED", "02:50", "warning", "Jean Robert"),
                    Task("Task " + nameSufix + "4", "ACTIVED", "02:50", "warning", "Jean Robert"),
                    Task("Task " + nameSufix + "5", "ACTIVED", "02:50", "bad", "Jean Robert"),
                    Task("Task " + nameSufix + "6", "RESOLVED", "02:50", "warning", "Jean Robert"),
                    Task("Task " + nameSufix + "7", "CLOSED", "02:50", "bad", "Jean Robert"),
                    Task("Task " + nameSufix + "8", "CLOSED", "02:50", "bad", "Jean Robert"),
                    Task("Task " + nameSufix + "9", "CLOSED", "02:50", "good", "Jean Robert")
                ];

                deferred.resolve(taskList);
                
            }, 1000);

            return deferred.promise;
        }

    }

})();