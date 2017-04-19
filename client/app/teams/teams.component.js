'use strict';

const angular = require('angular');
import { default as swal } from 'sweetalert2'

const uiRouter = require('angular-ui-router');

import routes from './teams.routes';

export class TeamsComponent {
  /*@ngInject*/
  constructor(Project, $scope, Auth, Team, $state) {
    this.Project = Project;
    this.$state = $state;
    this.Team = Team;
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

    this.activeTeam = t;

    let c = this.teams.indexOf(t);
    this.$scope.activeColor = this.getColor(c);

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

  createTeam() {
    swal({
      title: "Add a Team",
      text: "What is the name of the team?",
      input: "text",
      confirmButtonText: "Create Team",
      showCancelButton: true,
    })
    .then(name => {
      return this.Team.create({name});
    })
    .then(team => {
      console.log(team);
      this.teams.push(team);
      this.setActiveTeam(team);
    })
  }

  joinTeam() {
    swal({
      title: 'Join a Team',
      text: 'Enter the team ID',
      input: "text",
      confirmButtonText: "Join Team",
      showCancelButton: true,
    })
      .then(teamId => {
        this.Team.addUser(teamId)
          .then(team => {
            console.log(team);
            this.teams.push(team);
            this.setActiveTeam(team);
          })
          .catch(err => {
            swal('Not Found', 'The specified team could not be found', 'error');
          })
      })
  }

  addProject() {
    swal.setDefaults({
      input: 'text',
      type: 'info',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3'],
      title: 'Add a Project',
    });

    swal.queue([
      {text: 'What is the name of the project?'},
      {
        text: 'Give a brief description of the project',
        input: 'textarea',
      },
    ])
      .then(results => {
        let [name, description] = results;
        let team = this.Team.addProject(this.activeTeam._id, {name, description})
          .then(project => {
            this.$state.go('project.details', {id: project._id});
          })
      })
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
