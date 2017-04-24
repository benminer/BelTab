'use strict';
const angular = require('angular');

/*@ngInject*/
export function storyService($http, $resource) {

  let service = {};

  let StoryResource = $resource('/api/stories/:id/:controller', {id: '@_id'});

  /**
  * Get user stories for a project and cache them;
  *
  * @param projectId {string}
  * @return {Promise<Story>[]}
  */
  service.getForProject = function(projectId) {
    console.log(projectId);
    return StoryResource.query({project: projectId}).$promise
  }

  return service;
}

export default angular.module('jsScrumBoardApp.project.storyService', [])
  .service('Story', storyService)
  .name;
