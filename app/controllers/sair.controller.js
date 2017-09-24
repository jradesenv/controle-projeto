(function () {
    'use strict';

    angular.module('app.controllers')
        .controller("sairController", function ($scope, $mdDialog, $rootScope) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.logout = function () {
                $mdDialog.cancel();
                $rootScope.logout();
            }
        });


})();