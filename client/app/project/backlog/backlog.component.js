'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import backlogService from '../../services/project/backlog.service.js'

import routes from './project.routes';

export class BacklogComponent {
  /*@ngInject*/
  constructor(Project) {
    this.Project = Project;
  }
}

export default angular.module('jsScrumBoardApp.projectBacklog', [uiRouter, backlogService])
  .config(routes)
  .component('backlog', {
    template: require('./backlog.html'),
    controller: backlogComponent,
    controllerAs: 'vm',
    bindings: {project: '='}
  })
  .name;
