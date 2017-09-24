(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("novoTaskController", function ($scope, $mdDialog) {
            var vm = this;
            vm.title = "NOVA TASK";
            vm.cancel = cancel;
            vm.save = save;            

            function cancel () {
                $mdDialog.cancel();
            }

            function save () {
                $mdDialog.cancel();
            }
        });


})();