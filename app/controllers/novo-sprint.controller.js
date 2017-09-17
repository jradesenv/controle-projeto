(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('novoSprintController', NovoSprintController)

    function NovoSprintController() {
        var vm = this;
        vm.salvar = salvar;

        function salvar() {
            alert("novoSprint!!");
        }
    }

})();