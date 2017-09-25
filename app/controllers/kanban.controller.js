(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('kanbanController', KanbanController)

    function KanbanController($scope, $rootScope, $mdDialog, $mdMedia, taskService, dialogService) {
        var vm = this;
        vm.errorMessage = null;
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.tasks;
        vm.onTaskStatusChange = onTaskStatusChange;
        vm.onTaskClick = onTaskClick

        var filtroAplicadoEvent = $rootScope.$on('filter-applied-event', onFiltroAplicado);

        $scope.$on('$destroy', function () {
            filtroAplicadoEvent();
        });

        init();

        function init() {
            console.log("kanban init");

            atualizarKanban();
        }

        function atualizarKanban() {
            $rootScope.isLoading = true;

            if ($rootScope.project != null) {

                var listTaskPromise = taskService.list($rootScope.project, $rootScope.sprint);
                listTaskPromise.then(function (taskList) {
                    updateTaskBoard(taskList);

                }, function (errorMessage) {
                    showMessage(errorMessage);

                });

            } else {
                showMessage("Aplique um filtro para ver o quuadro.");
            }
        }

        function showKanban() {
            vm.errorMessage = null;
            $rootScope.isLoading = false;
        }

        function showMessage(message) {
            vm.errorMessage = message;
            $rootScope.isLoading = false;
        }

        function onFiltroAplicado(event, data) {
            atualizarKanban();
        }

        function onTaskClick(task) {
            console.log("onTaskClick: ", task);

            dialogService.show('views/dialogs/task-detail.html', 'taskDetailController', {
                task: task
            });
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
                
                showKanban();

            }, function (errorMessage) {
                showMessage(errorMessage);

            });
        }

    }
})();