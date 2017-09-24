(function () {
      'use strict';
    
      angular.module('app')
        .config(function ($mdThemingProvider) {
          $mdThemingProvider.theme('default')
            .primaryPalette('light-blue', {
              'default': '300'
            })
            .accentPalette('deep-orange', {
              'default': '500'
            });
        })
        .config(['$stateProvider', '$urlRouterProvider', '$logProvider', 
        function ($stateProvider, $urlRouterProvider) {
    
          $urlRouterProvider.otherwise("/login");
    
          $stateProvider
          .state('login', {
            url: '/login', 
            views: {    
              '@': {
                templateUrl: 'views/login.html',
                controller: 'loginController as vm'
              }
            }
          })
            .state('home', {
              views: {    
                '@': {
                  templateUrl: 'views/home.html',
                  controller: 'homeController as vm'
                },
                'topcontent@home': {
                  templateUrl: 'views/top-filter.html',
                  controller: 'topFilterController as vm'
                }
              }
            })
            .state('home.kanban', {
              url: '/kanban',    
              views: {    
                'content@home': {
                    templateUrl: 'views/kanban.html',
                    controller: 'kanbanController as vm'
                }
              }
            })
            .state('home.hierarquia-tarefas', {
              url: '/hierarquia-tarefas',    
              views: {    
                'content@home': {
                    templateUrl: 'views/task-hierarchy.html'
                }
              }
            })
            .state('home.reports', {
              url: '/reports',    
              views: {    
                'content@home': {
                    templateUrl: 'views/reports.html'
                }
              }
            })
        }])
        //take all whitespace out of string
        .filter('nospace', function () {
          return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
          };
        })
        //replace uppercase to regular case
        .filter('humanizeDoc', function () {
          return function (doc) {
            if (!doc) return;
            if (doc.type === 'directive') {
              return doc.name.replace(/([A-Z])/g, function ($1) {
                return '-' + $1.toLowerCase();
              });
            }
            
            return doc.label || doc.name;
          };
      });
    
    })();