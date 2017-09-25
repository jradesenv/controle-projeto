(function () {
    'use strict';

    angular.module('app.services')
        .factory('dialogService', DialogService)

    function DialogService($mdDialog) {

        var self;

        return self = {
            show: show
        };

        function show(templateUrl, controllerName, parameters) {
            var opts = {
                templateUrl: templateUrl,
                controller: controllerName + ' as vm',
                clickOutsideToClose: true,
                parent: angular.element(document.getElementsByClassName('content-div')[0]),
                locals: {
                    parameters: angular.copy(parameters)
                }
            };

            $mdDialog.show(opts);
        }

    }

})();