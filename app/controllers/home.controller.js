(function () {
    'use strict';

    angular.module('app.controllers')
        .controller('homeController', HomeController)

    function HomeController(menuService) {
        var vm = this;

        //functions for menu-link and menu-toggle
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.menu = menuService;

        vm.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };


        function isOpen(section) {
            return menuService.isSectionSelected(section);
        }

        function toggleOpen(section) {
            menuService.toggleSelectSection(section);
        }
    }

})();