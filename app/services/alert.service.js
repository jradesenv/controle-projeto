(function () {
    'use strict';

    angular.module('app.services')
        .factory('alertService', AlertService)

    function AlertService($mdDialog, $mdToast) {

        var self;

        return self = {
            show: show
        };

        function show(title, message, okButtonText) {
            // var alert = $mdDialog.alert({
            //     title: title,
            //     textContent: message,
            //     ok: okButtonText
            // });

            // $mdDialog
            //     .show(alert)
            //     .finally(function () {
            //         alert = undefined;
            //     });

            $mdToast.show(
                $mdToast.simple()
                    .textContent(message).position('top center')
                    
            )
        }

    }

})();