(function () {
    'use strict';

    angular.module('app.directives')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('partials/menu-function.tmpl.html',
                '<md-button ng-class="{\'{{section.icon}}\' : true}" \n' +
                '   ng-click="focusSection()">\n' +
                '  {{section | humanizeDoc}}\n' +
                '</md-button>\n' +
                '');
        }])
        .directive('menuFunction', function () {
            return {
                scope: {
                    section: '=',
                    function: '='
                },
                templateUrl: 'partials/menu-function.tmpl.html',
                link: function ($scope, $element) {
                    var controller = $element.parent().controller();

                    $scope.focusSection = function () {
                        if (typeof $scope.function == "function") {
                            $scope.function();
                        }
                        // set flag to be used later when
                        // $locationChangeSuccess calls openPage()
                        controller.autoFocusContent = true;
                    };
                }
            };
        })
})();