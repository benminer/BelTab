'use strict';
const angular = require('angular');

/*@ngInject*/
export function projectService($http, $resource, Sprint) {

  let service = {};

  let ProjectResource = $resource('/api/projects/:id/:controller', {id: '@_id'}, {
    addSprint: {
      method: 'POST',
      params: {
        controller: 'sprint',
      }
    },
    addUserStory: {
      method: 'POST',
      params: {
        controller: 'story',
      }
    }
  });

  return {
    /**
    * Get projects for a team and cache them;
    * @param teamId {string}
    * @return {Promise<Project>[]}
    */
    getForTeam(teamId) {
      return ProjectResource.query({team: teamId}).$promise
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
  .service('Project', projectService)
  .name;
