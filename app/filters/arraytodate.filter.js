(function() {
    'use strict';

    var app = angular.module('app');

    app.filter('arraytodate', function() {
        return function(input) {
            return new Date(input[0], input[1] - 1, input[2], input[3], input[4], input[5]);
        }
    });
})();