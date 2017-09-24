(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("newTaskController", NewTaskController);

    function NewTaskController($scope, $mdDialog) {
        var vm = this;
        vm.title = "NOVA TASK";
        vm.cancel = cancel;
        vm.save = save;

        vm.users = []
        vm.task = {
            title: "",
            description: "",
            estimatedTime: "", //hh:mm
            assignee: null
        };

        init();

        function init() {
            console.log("novo task init");


        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.cancel();
        }
    }

})();