'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './projects.routes';

export class ProjectsComponent {
  /*@ngInject*/
  constructor() {
    this.projects = [{
      name: 'Project',
      description: 'Some description. Some description. Some description. Some description. '
    },
    {
      name: 'Another Project',
      description: 'Another description. Another description. Another description. Another description. '
    },

    {
      name: 'Another Project',
      description: 'Another description. Another description. Another description. Another description. '
    },

    {
      name: 'Another Project',
      description: 'Another description. Another description. Another description. Another description. '
    },

    {
      name: 'Another Project',
      description: 'Another description. Another description. Another description. Another description. '
    },

    {
      name: 'Another Project',
      description: 'Another description. Another description. Another description. Another description. '
    },

    {
      name: 'Another Project',
      description: 'Another description. Another description. Another description. Another description. '
    },

  ]
  }
}

export default angular.module('jsScrumBoardApp.projects', [uiRouter])
  .config(routes)
  .component('projects', {
    template: require('./projects.html'),
    controller: ProjectsComponent,
    controllerAs: 'vm'
  })
  .name;
