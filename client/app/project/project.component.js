'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import projectService from '../../services/project/project.service'

import routes from './project.routes';

export class ProjectComponent {
  /*@ngInject*/
  constructor() {

  }
}

export default angular.module('jsScrumBoardApp.project', [uiRouter, projectService])
  .config(routes)
  .component('project', {
    template: require('./project.html'),
    controller: ProjectComponent,
    controllerAs: 'vm',
    bindings: {project: '='}
  })
  .name;
