(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('kanbanController', KanbanController)

    function KanbanController($rootScope, $mdDialog, $mdMedia, taskService) {
        var vm = this;
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.tasks;
        vm.onTaskStatusChange = onTaskStatusChange;

        init();

        function init() {
            $rootScope.isLoading = true;

            console.log("kanban init");

            var listTaskPromise = taskService.list($rootScope.projeto, $rootScope.sprint);
            listTaskPromise.then(function (taskList) {
                updateTaskBoard(taskList);

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                alert(errorMessage);

            })
        }

        function onTaskStatusChange(index, task, status) {
            console.log("onTaskStatusChange: ", arguments);
        }

        function updateTaskBoard(tasks) {
            var listStatusPromise = taskService.listStatus();
            listStatusPromise.then(function (statusList) {
                var _tasks = {};
                var _statusList = {};

                statusList.forEach(function (status) {
                    _tasks[status] = [];
                });

                tasks.forEach(function (task) {
                    if (typeof _tasks[task.status] != "undefined") {
                        _tasks[task.status].push(task);
                    }
                });

                vm.tasks = _tasks;

                console.log("scope tasks: ", vm.tasks);

                $rootScope.isLoading = false;

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                alert(errorMessage);

            });
        }

    }
})();