'use strict';
const angular = require('angular');

/*@ngInject*/
export function sprintService($resource) {
	// AngularJS will instantiate a singleton by calling "new" on this function

  let SprintResource = $resource('/api/sprints/:id/:controller', {id: '@_id'},
  { 'update': {
    method: 'PUT'
  }
  });

  let service = {};

  service.create = function(body) {
    return new SprintResource(body);
  }

  service.end = function(body) {
    return new SprintResource(body);
  }

  return service;
}

export default angular.module('jsScrumBoardApp.sprint', [])
  .service('Sprint', sprintService)
  .name;
