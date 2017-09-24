(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("newBugController", NewBugController);

    function NewBugController($scope, $mdDialog, $rootScope, projectService, alertService, taskService) {
        var vm = this;
        vm.taskType = "bug";
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
            console.log("novo bug init");
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

            var bugCreatePromise = taskService.createBug(vm.task, $rootScope.project);
            bugCreatePromise.then(function (newBug) {
                alertService.showSuccess("Bug criado com sucesso!");
                console.log(newBug);
                $rootScope.updateData();
                $mdDialog.cancel();
                

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                console.error(errorMessage);
                alertService.showError("Ocorreu um erro ao tentar salvar o bug.");

            });
            
        }
    }

})();