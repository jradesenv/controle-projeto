(function () {
    'use strict';

    angular.module('app.services')
        .factory('taskService', TaskService)

    function TaskService($log, $q, $timeout, $rootScope) {

        var self;

        return self = {
            list: list,
            listStatus: listStatus,
            canCreateNewTask: canCreateNewTask,
            create: create,
            createBug: createBug
        };

        function createBug(bug, project) {
            var deferred = $q.defer();

            $timeout(function () {
                var createdBug = {
                    type: "bug",
                    title: bug.title,
                    estimatedTime: bug.estimatedTime,
                    description: bug.description,
                    assignee: bug.assignee,
                    projectId: project.id
                };

                deferred.resolve(createdBug);
            }, 1000);

            return deferred.promise;
        }

        function create(task, project) {
            var deferred = $q.defer();

            $timeout(function () {
                var createdTask = {
                    type: "task",
                    title: task.title,
                    estimatedTime: task.estimatedTime,
                    description: task.description,
                    assignee: task.assignee,
                    projectId: project.id
                };

                deferred.resolve(createdTask);
            }, 1000);

            return deferred.promise;
        }

        function canCreateNewTask() {
            if ($rootScope.sprint == null || typeof $rootScope.sprint != "object" || $rootScope.sprint.endDate < (new Date())) {
                return false;
            }
            return true;
        }

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
            }, 1000);

            return deferred.promise;
        }

        function list(project, sprint) {
            var deferred = $q.defer();

            $timeout(function () {

                var Task = function (type, title, status, description, estimatedTime, timeLeft, timeSpent, assignee) {
                    return {
                        type: type,
                        title: title,
                        status: status,
                        description: description,
                        estimatedTime: estimatedTime,
                        timeLeft: timeLeft,
                        timeSpent: timeSpent,
                        taskHealth: "",
                        assignee: assignee,
                        projectId: project.id
                    };
                }

                var nameSufix = project.name.split(" ")[1];
                if (sprint != null) {
                    nameSufix = sprint.name.split(" ")[1];
                }

                var assignee1 = {id: 1, name: "Jean Robert"};
                var assignee2 = {id: 2, name: "Guilherme"};

                var taskList = [
                    Task("task", "Task " + nameSufix + "1", "PROPOSED", "Descrição da tarefa 1", "04:30", "03:30", "01:00", assignee1),
                    Task("task", "Task " + nameSufix + "2", "ACTIVED", "Descrição da tarefa 2", "04:30", "01:30", "03:00", assignee2),
                    Task("bug", "Bug " + nameSufix + "3", "PROPOSED", "Descrição do bug 3", "04:30", "03:30", "01:00", assignee1),
                    Task("bug", "Bug " + nameSufix + "4", "CLOSED", "Descrição do bug 4", "04:30", "01:30", "03:00", assignee1),
                    Task("task", "Task " + nameSufix + "5", "CLOSED", "Descrição da tarefa 5", "04:30", "00:00", "04:30", assignee1),
                    Task("task", "Task " + nameSufix + "6", "PROPOSED", "Descrição da tarefa 6", "02:30", "00:00", "02:30", assignee2),
                    Task("bug", "Bug " + nameSufix + "7", "PROPOSED", "Descrição do bug 7", "02:30", "01:30", "01:00", assignee1)
                ];


                taskList.forEach(function(currentTask) {
                    setTaskHealth(currentTask);
                });

                console.log("taskList: ", taskList);
                deferred.resolve(taskList);

            }, 1000);

            return deferred.promise;
        }

        function setTaskHealth(task) {
            var hoursLeft = parseInt(task.timeLeft.split(":")[0]);

            if (hoursLeft > 2) {
                task.taskHealth = "good";
            } else if (hoursLeft > 0) {
                task.taskHealth = "warning";
            } else {
                task.taskHealth = "bad";
            }
        }

    }

})();