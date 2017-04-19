'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import projectService from '../../services/project/project.service'
import { default as swal }  from 'sweetalert2'

import routes from './project.routes';

export class ProjectComponent {
  /*@ngInject*/
  constructor() {

  }

  $onInit() {
  this.renderBurndown()
}

  addSprint() {
    swal({
      title: "New Sprint",
      text: "How long is this sprint?",
      input: "number",
      confirmButtonText: "Start Sprint",
      showCancelButton: true,
    })
    .then(length => {
      this.project.$addSprint({length})
        .then(sprint => {
          console.log(sprint);
        })
    })

  }

  renderBurndown() {

}


  // openBacklog()
  //add a user authentication here, if admin more options

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
