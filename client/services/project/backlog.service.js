'use strict';
const angular = require('angular');

/*@ngInject*/
export function backlogService($http, $resource) {

  let service = {};

  let BacklogResource = $resource('/api/projects/backlog/:id/:controller', {id: '@_id'});

  return {
    /**
    * Get projects for a team and cache them;
    * @param projectId {string}
    * @return {Promise<Project>[]}
    */
    getForProject(projectId) {
      return ProjectResource.query({project: projectId}).$promise
    },

    /**
    * Get a project by id
    */
    get(id) {
      return ProjectResource.get({id}).$promise
    }
  };
}

export default angular.module('jsScrumBoardApp.service', [])
  .service('Backlog', backlogService)
  .name;
