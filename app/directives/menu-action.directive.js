(function () {
    'use strict';

    angular.module('app.directives')
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('partials/menu-action.tmpl.html',
                '<md-button ng-class="{\'{{section.icon}}\' : true}" \n' +
                '   ng-click="focusSection()">\n' +
                '  {{section | humanizeDoc}}\n' +
                '</md-button>\n' +
                '');
        }])
        .directive('menuAction', function () {
            return {
                scope: {
                    section: '=',
                    action: '='
                },
                templateUrl: 'partials/menu-action.tmpl.html',
                link: function ($scope, $element) {
                    var controller = $element.parent().controller();

                    $scope.focusSection = function () {
                        if (typeof $scope.action == "function") {
                            $scope.action();
                        }
                        // set flag to be used later when
                        // $locationChangeSuccess calls openPage()
                        controller.autoFocusContent = true;
                    };
                }
            };
        })
})();