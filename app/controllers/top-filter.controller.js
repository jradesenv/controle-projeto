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
        vm.hasProjectChanged = false;
        vm.hasSprintChanged = false;

        var updateHeaderEvent = $rootScope.$on('update-header-event', onUpdateHeaderEvent);
        $scope.$on('$destroy', function () {
            updateHeaderEvent();
        });

        function onUpdateHeaderEvent() {
            $rootScope.isLoading = true;
            onProjectSelected();
        }

        $scope.$watch('vm.projectSelected', onProjectSelected);
        $scope.$watch('vm.sprintSelected', onSprintSelected);

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

        function onProjectSelected () {
            console.log("onProjectSelected projectSelected: ", vm.projectSelected)
            vm.sprintSelected = null;
            vm.sprints = [];

            updateChangeFlags();

            if (vm.projectSelected != null) {
                buscarSprintsPorProject(vm.projectSelected);
            }
        }

        function onSprintSelected() {
            updateChangeFlags();
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

                if ($rootScope.sprint != null) {
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

            updateChangeFlags();
        }

        function updateChangeFlags() { 
            vm.hasProjectChanged = !angular.equals(vm.projectSelected, $rootScope.project);
            vm.hasSprintChanged = !angular.equals(vm.sprintSelected, $rootScope.sprint);
        }

        function aplicarFiltro() {
            console.log("filtro aplicado: ", vm.projectSelected, vm.sprintSelected);

            $rootScope.project = vm.projectSelected;
            $rootScope.sprint = vm.sprintSelected;

            updateChangeFlags();
            $rootScope.updateData();
        }

    }

})();