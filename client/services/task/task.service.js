'use strict';
const angular = require('angular');

/*@ngInject*/
export function storyService($http, $resource) {

  let service = {};

  let TaskResource = $resource('/api/tasks/:id/:controller', {id: '@_id'});

  /**
  * Get user stories for a project and cache them;
  *
  * @param storyId {string}
  * @return {Promise<Story>[]}
  */
  service.getForProject = function(taskId) {
    return TaskResource.query({task: taskId}).$promise
  }

  return service;
}

export default angular.module('jsScrumBoardApp.task', [])
  .service('Task', taskService)
  .name;
