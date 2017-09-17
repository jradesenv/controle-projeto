(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('task', ['$state', '$mdMedia', '$mdDialog', function ($state, $mdMedia, $mdDialog) {
        return {
            restrict: 'E',
            templateUrl: 'views/kanban/task.html',
            scope: {
                task: '=task'
            },
            link: function ($scope) {

                $scope.showTaskDetails = function (ev) {
                    console.log("show task detail: ", ev);
                };

                function updateTask(task) {
                    console.log("update task: ", ev);
                }
            }
        }
    }]);

})();