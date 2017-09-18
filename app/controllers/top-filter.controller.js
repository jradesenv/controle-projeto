(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('topFilterController', TopFilterController)

    function TopFilterController(projetoService, sprintService, $scope, $rootScope) {
        var vm = this;
        vm.projetos = [];
        //vm.projetoSelecionado = null;
        vm.sprints = [];
        vm.sprintSelecionado = null;

        vm.aplicarFiltro = aplicarFiltro;

        $scope.$watch('vm.projetoSelecionado', function () {
            console.log("watch projetoSelecionado: ", vm.projetoSelecionado)
            vm.sprintSelecionado = null;
            vm.sprints = [];

            if (vm.projetoSelecionado != null) {
                buscarSprintsPorProjeto(vm.projetoSelecionado);
            }
        });

        init();

        function init() {
            $rootScope.isLoading = true;

            console.log("top init");

            var listProjetoPromise = projetoService.list();
            listProjetoPromise.then(function (projetoList) {
                vm.projetos = projetoList;

                if ($rootScope.projeto != null) {
                    vm.projetoSelecionado = getByNome(vm.projetos, $rootScope.projeto.nome); //para pegar a referencia atual
                
                } else {
                    vm.projetoSelecionado = null;
                }

                console.log("projetos: ", vm.projetos);
                console.log("projetoSelecionado: ", vm.projetoSelecionado);

                if (vm.projetoSelecionado != null) {
                    buscarSprintsPorProjeto(vm.projetoSelecionado);
                } else {
                    $rootScope.isLoading = false;
                }
            }, function (errorMessage) {
                alert(errorMessage);
            });

        }

        function getByNome(arr, nome) {
            for (var i = 0, iLen = arr.length; i < iLen; i++) {
                if (arr[i].nome == nome) return arr[i];
            }

            return null;
        }

        function buscarSprintsPorProjeto(projeto) {
            console.log("buscarSprintsPorProjeto");
            $rootScope.isLoading = true;

            var listSprintPromise = sprintService.listPorProjeto(projeto);
            listSprintPromise.then(function (sprintList) {
                vm.sprints = sprintList;
                
                if ($rootScope.projeto != null) {
                    vm.sprintSelecionado = getByNome(vm.sprints, $rootScope.sprint.nome); //para pegar a referencia atual
                
                } else {
                    vm.sprintSelecionado = null;
                }

                console.log("sprints: ", vm.sprints);
                console.log("sprintSelecionado: ", vm.sprintSelecionado);

                $rootScope.isLoading = false;

            }, function (errorMessage) {
                alert(errorMessage);
            });
        }

        function aplicarFiltro() {
            console.log("filtro aplicado: ", vm.projetoSelecionado, vm.sprintSelecionado);
            
            $rootScope.projeto = vm.projetoSelecionado;
            $rootScope.sprint = vm.sprintSelecionado;

            $rootScope.$broadcast('filtro-aplicato-event');
        }

    }

})();