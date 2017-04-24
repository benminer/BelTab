'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import Chart from 'chart.js';

import projectService from '../../services/project/project.service'
import {
	default as swal
} from 'sweetalert2'

import routes from './project.routes';

export class ProjectComponent {
	/*@ngInject*/
	constructor() {

	}

	$onInit() {
		this.renderBurndown();
	}

	addSprint() {
		swal({
				title: "New Sprint",
				text: "How long is this sprint?",
				input: "number",
				confirmButtonText: "Start Sprint",
				showCancelButton: true,
			})
			.then(length => {
				this.project.$addSprint({
						length
					})
					.then(sprint => {
						console.log(sprint);
					})
			})

	}
	// openBacklog()
	//add a user authentication here, if admin more options

	renderBurndown() {
		let ctx = document.getElementById('burndownChart');

		this.burndownChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: Array(11).fill(0).map((_, i) => i + 1),
				datasets: [{
					label: 'Actual',
					data: [100, 95, 80, 69, 53, 42],
					borderColor: '#26C6DA',
					backgroundColor: 'rgba(0,188,212,0.2)',
				}, {
					label: 'Pace',
					borderColor: '#BDBDBD',
					backgroundColor: 'rgba(0,0,0,0)',
					data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
				}, {
					label: 'Predicted',
					borderColor: '#80DEEA',
					backgroundColor: 'rgba(0,0,0,0)',
					data: [100, 95, 80, 69, 53, 42, 30, 20, 11, 5, 0]
				}],
			},
			options: {
				scales: {
					yAxes: [{
						ticks: { beginAtZero: true }
					}],
					xAxes: [{
						ticks: { beginAtZero: true }
					}]
				},
			}
		});

	}
}

export default angular.module('jsScrumBoardApp.project', [uiRouter, projectService])
	.config(routes)
	.component('project', {
		template: require('./project.html'),
		controller: ProjectComponent,
		controllerAs: 'vm',
		bindings: {
			project: '='
		}
	})
	.name;
