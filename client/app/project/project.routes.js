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
    .state('project.backlog', {
      url: '/backlog',
      parent: 'project',
      template: '<backlog project="$resolve.project" stories="$resolve.stories"></backlog>',
      resolve: {
        stories: function($stateParams, Story) {
          return Story.getForProject($stateParams.id)
            .then(stories => {
              console.log(stories);
            })
        }
      },
    });
}
