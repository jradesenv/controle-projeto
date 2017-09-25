(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("taskDetailController", TaskDetailController);

    function TaskDetailController($scope, $mdDialog, $rootScope, projectService, alertService, taskService, parameters) {
        var vm = this;
        vm.taskType = parameters.type;
        vm.cancel = cancel;
        vm.save = save;

        vm.userList = [];
        vm.task = parameters.task;

        init();

        function init() {
            console.log("task detail init");
            $rootScope.isLoading = true;

            var listUsersByProjectPromise = projectService.listUsersByProject($rootScope.project);
            listUsersByProjectPromise.then(function (userList) {
                vm.userList = userList
                $rootScope.isLoading = false;

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                console.error(errorMessage);
                alertService.showError("Ocorreu um erro ao buscar responsáveis.");
            });

        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $rootScope.isLoading = true;

            var taskCreatePromise = taskService.create(vm.task, $rootScope.project);
            taskCreatePromise.then(function (newTask) {
                alertService.showSuccess("Item atualizado com sucesso!");
                console.log(newTask);
                $rootScope.updateData();
                $mdDialog.cancel();

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                console.error(errorMessage);
                alertService.showError("ERRO", "Ocorreu um erro ao tentar atualizar o item.");

            });
            
        }
    }

})();