(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("newTaskController", NewTaskController);

    function NewTaskController($scope, $mdDialog, $rootScope, projectService, alertService, taskService) {
        var vm = this;
        vm.title = "NOVA TASK";
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
                alertService.show("ERRO", "Ocorreu um erro ao buscar responsáveis.", "OK");
            });

        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $rootScope.isLoading = true;

            var taskCreatePromise = taskService.create(vm.task, $rootScope.project);
            taskCreatePromise.then(function (newTask) {
                console.log(newTask);
                $rootScope.atualizarDados();
                $mdDialog.cancel();

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                console.error(errorMessage);
                alertService.show("ERRO", "Ocorreu um erro ao buscar responsáveis.", "OK");

            });
            
        }
    }

})();