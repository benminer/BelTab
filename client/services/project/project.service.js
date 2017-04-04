'use strict';
const angular = require('angular');

/*@ngInject*/
export function projectService($http, $resource) {

  let service = {};

  let ProjectResource = $resource('/api/projects/:id/:controller', {id: '@_id'});

  /**
  * Get projects for a team and cache them;
  * @param teamId {string}
  * @return {Promise<Project>[]}
  */
  service.getForTeam = function(teamId) {
    return ProjectResource.query({team: teamId}).$promise
  }

  return service;
}

export default angular.module('jsScrumBoardApp.project', [])
  .service('Project', projectService)
  .name;
