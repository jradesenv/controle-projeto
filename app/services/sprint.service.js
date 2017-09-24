(function () {
    'use strict';

    angular.module('app.services')
        .factory('sprintService', SprintService)

    function SprintService($log, $q, $timeout, $rootScope) {

        var self;

        return self = {
            canCreateNewSprint: canCreateNewSprint,
            create: create,
            listByProject: listByProject
        };

        function canCreateNewSprint() {
            if ($rootScope.project == null || typeof $rootScope.project != "object") {
                return false;
            }
            return true;
        }

        function create(sprint, project) {
            var deferred = $q.defer();

            $timeout(function () {
                var createdSprint = {
                    name: sprint.name,
                    startDate: sprint.startDate,
                    endDate: sprint.endDate,
                    projectId: project.id
                };

                deferred.resolve(createdSprint);
            }, 1000);

            return deferred.promise;
        }

        function listByProject(project) {
            var deferred = $q.defer();

            $timeout(function () {

                var Sprint = function (name, startDate, endDate) {

                    return {
                        name: name,
                        startDate: startDate,
                        endDate: endDate
                    };
                }

                function sumDays(from, numDays) {
                    return new Date(from.getTime() + (numDays * (24 * 60 * 60 * 1000)));
                }

                function subtractDays(from, numDays) {
                    return new Date(from.getTime() - (numDays * (24 * 60 * 60 * 1000)));
                }

                var projectId = project.name.split(" ")[1];
                var today = new Date();

                var sprintList = [
                    Sprint("Sprint " + projectId + "1", today, sumDays(today, 5)),
                    Sprint("Sprint " + projectId + "2", subtractDays(today, 5), subtractDays(today, 2)),
                    Sprint("Sprint " + projectId + "3", subtractDays(today, 15), subtractDays(today, 6)),
                    Sprint("Sprint " + projectId + "4", subtractDays(today, 7), sumDays(today, 1))
                ];

                deferred.resolve(sprintList);

            }, 1000);

            return deferred.promise;
        }

    }

})();