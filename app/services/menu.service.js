(function () {
    'use strict';

    angular.module('app.services')
        .factory('menuService', MenuService)

    function MenuService($location, $mdDialog, taskService, alertService, dialogService) {

        var sections = [{
            name: 'Kanban',
            state: 'home.kanban',
            type: 'link'
        }];

        sections.push({
            name: 'Hierarquia de Tarefas',
            state: 'home.hierarquia-tarefas',
            type: 'link'
        });

        sections.push({
            name: 'Relatórios',
            state: 'home.reports',
            type: 'link'
        });

        sections.push({
            name: 'Novo',
            type: 'toggle',
            pages: [{
                name: 'Sprint',
                type: 'link',
                state: 'home.novo.sprint',
                icon: 'fa fa-repeat'
            }, {
                name: 'Task',
                type: 'action',
                action: function () {
                    if (taskService.canCreateNewTask()) {
                        dialogService.show('views/dialogs/new-task.html', 'newTaskController');
                    } else {
                        alertService.show("ATENÇÃO", "Para criar uma task, é necessário selecionar um sprint não finalizado.", "OK");
                    }
                },
                icon: 'fa fa-tasks'
            },
            {
                name: 'Bug',
                state: 'home.novo.bug',
                type: 'link',
                icon: 'fa fa-bug'
            }]
        });

        sections.push({
            name: 'Sair',
            type: 'action',
            action: function () {
                dialogService.show('views/dialogs/logout.html', 'logoutController');
            }
        });

        var self;

        return self = {
            sections: sections,
            toggleSelectSection: toggleSelectSection,
            isSectionSelected: isSectionSelected,
            selectPage: selectPage
        };

        function toggleSelectSection(section) {
            self.openedSection = (self.openedSection === section ? null : section);
        }

        function isSectionSelected(section) {
            return self.openedSection === section;
        }

        function selectPage(section, page) {
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
        }

    }

})();