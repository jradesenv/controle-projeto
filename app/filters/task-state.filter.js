

(function () {
    'use strict';

    var taskStates = {
        "good": "No prazo",
        "warning": "Requer atenção",
        "bad": "Atrasado"
    };

    var app = angular.module('app');

    app.filter('taskState', function () {
        return function (state) {
            return taskStates[state];
        }
    });
})();