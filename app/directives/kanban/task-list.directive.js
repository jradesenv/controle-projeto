(function() {
    'use strict';

    var app = angular.module('app');

    app.directive('taskList', ['$mdDialog', '$mdMedia', function($mdDialog, $mdMedia) {
        return {
            restrict: 'E',
            templateUrl: 'views/kanban/task-list.html',
            scope: {
                taskList: '=taskList',
                status: '=status',
                onDropFunction: '=onDropFunction',
                onTaskClick: '=onTaskClick'
            },
            link: function($scope) {
                console.log("taskList link");

                $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

                $scope.dropCallback = function(index, task) {
                    console.log("dropCallback");
                    console.log(task);
                    task.status = $scope.status;

                    if (typeof $scope.onDropFunction == "function") {
                        $scope.onDropFunction(index, task, $scope.status);
                    }

                    console.log(task);

                    return task;
                };

            }
        }
    }]);

})();