(function () {
    'use strict';

    angular.module('app.services')
        .factory('sprintService', SprintService)

    function SprintService($log, $q, $timeout) {

        var self;

        return self = {
            listByProject: listByProject
        };

        function listByProject(project) {
            var deferred = $q.defer();

            $timeout(function () {

                var Sprint = function (name) {

                    return {
                        name: name
                    };
                }

                var projectId = project.name.split(" ")[1];
                
                var sprintList = [
                    Sprint("Sprint " + projectId + "1"),
                    Sprint("Sprint " + projectId + "2"),
                    Sprint("Sprint " + projectId + "3"),
                    Sprint("Sprint " + projectId + "4")
                ];

                deferred.resolve(sprintList);
                
            }, 1000);

            return deferred.promise;
        }

    }

})();