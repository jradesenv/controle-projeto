(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("newTaskController", NewTaskController);

    function NewTaskController($scope, $mdDialog, $rootScope, projectService, alertService, taskService) {
        var vm = this;
        vm.taskType = "task";
        vm.cancel = cancel;
        vm.save = save;

        vm.userList = [];
        vm.task = {
            title: "",
            description: "",
            estimatedTime: "", //hh:mm
            assignee: null
        };

        init();

        function init() {
            console.log("novo task init");
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
                alertService.showSuccess("Task criada com sucesso!");
                console.log(newTask);
                $rootScope.updateData();
                $mdDialog.cancel();

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                console.error(errorMessage);
                alertService.showError("ERRO", "Ocorreu um erro ao tentar salvar a task.");

            });
            
        }
    }

})();