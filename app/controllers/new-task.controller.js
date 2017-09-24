(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("newTaskController", NewTaskController);

    function NewTaskController($scope, $mdDialog, $rootScope, projectService, alertService) {
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

            var listUsersByProjectPromise = projectService.listUsersByProject($rootScope.project);
            listUsersByProjectPromise.then(function (userList) {
                vm.userList = userList

            }, function (errorMessage) {
                console.error(errorMessage);
                alertService.show("ERRO", "Ocorreu um erro ao buscar responsáveis.", "OK");

            });

        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            //$mdDialog.cancel();
            console.log(vm.task);
        }
    }

})();