'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './teams.routes';

export class TeamsComponent {
  /*@ngInject*/
  constructor(Project, $scope, Auth) {
    this.Project = Project;
    this.$scope = $scope;
    this.user = Auth.getCurrentUser();
    this.teams = [];
    this.projects = [];
  }

  $onInit() {
    this.$scope.$watch('activeTeam', () => {
      this.setActiveTeam(this.$scope.activeTeam)
    });

    Promise.resolve(this.user)
      .then(u => {
        this.teams = u.teams;
        this.setActiveTeam(this.teams[0])
      });
  }

  setActiveTeam(t) {
    if (!t) return;

    let c = this.teams.indexOf(t);
    this.$scope.activeColor = this.getColor(c);
    // this.$scope.$apply();

    this.Project.getForTeam(t._id)
      .then(projects => {
        this.projects = projects;
      })
  }

  getColor(i) {
    return [
      "#FF7043",
      "#42A5F5",
      "#FFC107",
      "#26A69A",
    ][i%4]
  }


}

export default angular.module('jsScrumBoardApp.teams', [uiRouter])
  .config(routes)
  .component('teams', {
    template: require('./teams.html'),
    controller: TeamsComponent,
    controllerAs: 'vm'
  })
  .name;
