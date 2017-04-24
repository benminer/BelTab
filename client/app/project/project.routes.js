'use strict';


export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('project', {
      url: '/project/:id',
      abstract: true,
      template: '<div ui-view="" />',
      redirectTo: 'project.details',
      redirectTo: 'project.backlog',
      resolve: {
        project: function($stateParams, Project) {
          return Project.get($stateParams.id)
        }
      },
    })
    .state('project.details', {
      url: '',
      parent: 'project',
      template: '<project project="$resolve.project"></project>',
    })
    .state('project.burndown', {
      url: '/burndown',
      parent: 'project',
      template: '<burndown project="$resolve.project" stories="$resolve.stories"></burndown>',
    })
}
