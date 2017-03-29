'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('projects', {
      url: '/projects',
      template: '<projects></projects>',
      authenticate: true,
    });
}
