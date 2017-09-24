(function () {
    'use strict';

    angular.module('app.services')
        .factory('projectService', ProjectService)

    function ProjectService($log, $q, $timeout) {

        var self;

        return self = {
            list: list
        };

        function list() {
            var deferred = $q.defer();

            $timeout(function () {

                var Project = function (name) {

                    return {
                        name: name
                    };
                }
                
                var projectList = [
                    Project("Project 1"),
                    Project("Project 2"),
                    Project("Project 3"),
                    Project("Project 4")
                ];

                deferred.resolve(projectList);
                
            }, 1000);

            return deferred.promise;
        }

    }

})();