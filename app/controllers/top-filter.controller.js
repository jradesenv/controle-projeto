(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('topFilterController', TopFilterController)

    function TopFilterController() {
        var vm = this;
        vm.filtrar = filtrar;

        function filtrar() {
            alert("filtrando!!");
        }
    }

})();