'use strict';


export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('project', {
      url: '/project/:id',
      abstract: true,
      template: '<div ui-view="" />',
      redirectTo: 'project.details',
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
    });
}
