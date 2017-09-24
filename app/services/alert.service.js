(function () {
    'use strict';

    angular.module('app.services')
        .factory('alertService', AlertService)

    function AlertService($mdDialog, $mdToast) {

        var self;

        return self = {
            showSuccess: showSuccess,
            showWarning: showWarning,
            showError: showError
        };

        function showError(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top center')
                    .toastClass('toast-error')
            )
        }

        function showWarning(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top center')
                    .toastClass('toast-warning')
            )
        }
        
        function showSuccess(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top center')
                    .toastClass('toast-success')
            )
        }

        //function show(title, message, okButtonText) {
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
        //}

    }

})();