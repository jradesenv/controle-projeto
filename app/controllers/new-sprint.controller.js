(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("newSprintController", NewSprintController);

    function NewSprintController($scope, $mdDialog, $rootScope, projectService, alertService, sprintService) {
        var vm = this;
        vm.cancel = cancel;
        vm.save = save;

        vm.sprint = {
            name: "",
            startDate: null,
            endDate: null
        };

        init();

        function init() {
            console.log("novo sprint init");
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $rootScope.isLoading = true;

            var sprintCreatePromise = sprintService.create(vm.sprint, $rootScope.project);
            sprintCreatePromise.then(function (newSprint) {
                alertService.showSuccess("Sprint criada com sucesso!");
                console.log(newSprint);
                $rootScope.updateHeader(); //to update the sprint dropdown
                $mdDialog.cancel();

            }, function (errorMessage) {
                $rootScope.isLoading = false;
                console.error(errorMessage);
                alertService.showError("ERRO", "Ocorreu um erro ao tentar salvar a sprint.");

            });
            
        }
    }

})();