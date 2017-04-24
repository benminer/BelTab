'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import storyService from '../../../services/story/story.service'

import routes from '../project.routes';

export class BacklogComponent {
  /*@ngInject*/
  constructor() {

  }
}

export default angular.module('jsScrumBoardApp.backlog', [
  uiRouter,
  // storyService
])
  .component('backlog', {
    template: require('./backlog.html'),
    controller: BacklogComponent,
    controllerAs: 'vm',
    bindings: {project: '=', stories: '='}
  })
  .name;
