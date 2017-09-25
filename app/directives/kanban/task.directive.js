(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('task', ['$state', '$mdMedia', '$mdDialog', function ($state, $mdMedia, $mdDialog) {
        return {
            restrict: 'E',
            templateUrl: 'views/kanban/task.html',
            scope: {
                task: '=task',
                onTaskClick: '=onTaskClick'
            },
            link: function ($scope) {

                $scope.taskClicked = function (task) {
                    console.log("show task detail: ", task);

                    if (typeof $scope.onTaskClick == "function") {
                        $scope.onTaskClick(task);
                    }
                };

                function updateTask(task) {
                    console.log("update task: ", ev);
                }
            }
        }
    }]);

})();