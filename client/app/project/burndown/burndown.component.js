'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import storyService from '../../../services/story/story.service'

import routes from '../project.routes';

export class BurndownsComponent {
  /*@ngInject*/
  constructor() {

  }
}

export default angular.module('jsScrumBoardApp.burndown', [
  uiRouter,
  // storyService
])
  .component('burndown', {
    template: require('./burndown.html'),
    controller: BacklogComponent,
    controllerAs: 'vm',
    bindings: {project: '=', stories: '='}
  })
  .name;
