(function () {
    'use strict';

    angular.module('app.services')
        .factory('projectService', ProjectService)

    function ProjectService($log, $q, $timeout) {

        var self;

        return self = {
            list: list,
            listUsersByProject: listUsersByProject
        };

        function listUsersByProject(project) {
            var deferred = $q.defer();
            
            $timeout(function () {

                var User = function (id, name, email) {

                    return {
                        id: id,
                        name: name,
                        email: email
                    };
                }

                var projectId = project.id;
                
                var userList = [
                    User(1, "Jean Robert", "jeanrobert@user.com"),
                    User(2, "Guilherme", "guilherme@user.com"),
                    User(3, "Usuário " + projectId + "3", "user" + projectId + "3@user.com"),
                    User(4, "Usuário " + projectId + "4", "user" + projectId + "4@user.com")
                ];

                deferred.resolve(userList);
                
            }, 1000);

            return deferred.promise;
        }

        function list() {
            var deferred = $q.defer();

            $timeout(function () {

                var Project = function (id, name) {

                    return {
                        id: id,
                        name: name
                    };
                }
                
                var projectList = [
                    Project(1, "Project 1"),
                    Project(2, "Project 2"),
                    Project(3, "Project 3"),
                    Project(4, "Project 4")
                ];

                deferred.resolve(projectList);
                
            }, 1000);

            return deferred.promise;
        }

    }

})();