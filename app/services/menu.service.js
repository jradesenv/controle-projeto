(function () {
    'use strict';

    angular.module('app.services')
        .factory('menuService', MenuService)

    function MenuService($location) {

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
            state: 'home.relatorios',
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
                state: 'home.novo.task',
                type: 'link',
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
            state: 'home.sair',
            type: 'link'
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