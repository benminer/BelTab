'use strict';
const angular = require('angular');

/*@ngInject*/
export function TeamService($http, $resource, Auth) {

	let service = {};
	let user = Auth.getCurrentUser();

	let TeamResource = $resource('/api/teams/:id/:controller', {
		id: '@_id'
	}, {
		addProject: {
			method: 'POST',
			params: {
				controller: 'project'
			}
		}
	});

	return {

		/**
		 * Get a project by id
		 */
		get(id) {
			return TeamResource.get({
				id
			}).$promise
		},

		create(body) {
      return Promise.resolve(user)
        .then(u => {
          body.members = body.members || [];
    			body.members.push(u._id);

    			let t = new TeamResource(body);
    			return t.$save();
        })
		},

		addUser(teamId) {
			return Promise.resolve(user)
				.then(u => {
					return $http.put(`/api/teams/${teamId}/addUser`, {
							userId: u._id,
						})
						.then(res => {
							return res.data.team;
						})
				})

		},

		addProject(teamId, project) {
			return $http.post(`/api/teams/${teamId}/project`, project)
					.then(res => {
						console.log(res.data);
						return res.data.project;
					});
		}

	};
}

export default angular.module('jsScrumBoardApp.team', [])
	.service('Team', TeamService)
	.name;
