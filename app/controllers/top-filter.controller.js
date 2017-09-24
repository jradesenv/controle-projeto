(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('topFilterController', TopFilterController)

    function TopFilterController(projectService, sprintService, $scope, $rootScope) {
        var vm = this;
        vm.projects = [];
        vm.projectSelected = null;
        vm.sprints = [];
        vm.sprintSelected = null;
        vm.desfazerAlteracoes = desfazerAlteracoes;
        vm.aplicarFiltro = aplicarFiltro;

        $scope.$watch('vm.projectSelected', function () {
            console.log("watch projectSelected: ", vm.projectSelected)
            vm.sprintSelected = null;
            vm.sprints = [];

            if (vm.projectSelected != null) {
                buscarSprintsPorProject(vm.projectSelected);
            }
        });

        init();

        function init() {
            $rootScope.isLoading = true;

            console.log("top init");

            var listProjectPromise = projectService.list();
            listProjectPromise.then(function (projectList) {
                vm.projects = projectList;

                if ($rootScope.project != null) {
                    vm.projectSelected = getByNome(vm.projects, $rootScope.project.name); //para pegar a referencia atual

                } else {
                    vm.projectSelected = null;
                }

                console.log("projects: ", vm.projects);
                console.log("projectSelected: ", vm.projectSelected);

                if (vm.projectSelected != null) {
                    buscarSprintsPorProject(vm.projectSelected);
                } else {
                    $rootScope.isLoading = false;
                }
            }, function (errorMessage) {
                alert(errorMessage);
            });

        }

        function getByNome(arr, nome) {
            for (var i = 0, iLen = arr.length; i < iLen; i++) {
                if (arr[i].name == nome) return arr[i];
            }

            return null;
        }

        function buscarSprintsPorProject(project) {
            console.log("buscarSprintsPorProject");
            $rootScope.isLoading = true;

            var listSprintPromise = sprintService.listByProject(project);
            listSprintPromise.then(function (sprintList) {
                vm.sprints = sprintList;

                if ($rootScope.project != null) {
                    vm.sprintSelected = getByNome(vm.sprints, $rootScope.sprint.name); //para pegar a referencia atual

                } else {
                    vm.sprintSelected = null;
                }

                console.log("sprints: ", vm.sprints);
                console.log("sprintSelected: ", vm.sprintSelected);

                $rootScope.isLoading = false;

            }, function (errorMessage) {
                alert(errorMessage);
            });
        }

        function desfazerAlteracoes() {
            vm.projectSelected = $rootScope.project;
            vm.sprintSelected = $rootScope.sprint;
        }

        function aplicarFiltro() {
            console.log("filtro aplicado: ", vm.projectSelected, vm.sprintSelected);

            $rootScope.project = vm.projectSelected;
            $rootScope.sprint = vm.sprintSelected;

            $rootScope.$broadcast('filtro-aplicato-event');
        }

    }

})();