'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import projectService from '../../services/project/project.service'
import { default as swal }  from 'sweetalert2'
import Chart from 'chart.js'

import routes from './project.routes';

export class ProjectComponent {
  /*@ngInject*/
  constructor() {

  }

  $onInit() {
  this.renderBurndown()
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
      this.project.$addSprint({length})
        .then(sprint => {
          console.log(sprint);
        })
    })

  }

  renderBurndown() {
    var ctx = document.getElementById("burndown");
    var scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: 10,
                y: -10
            }, {
                x: 8,
                y: -6
            }, {
                x: 5,
                y: -2
            }, {
                x: 4,
                y: 1
            }, {
                x: 3,
                y: 2
            }, {
                x: 2,
                y: 3
            }, {
                x: 0,
                y: 4
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});
}
//     var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
// }



  // openBacklog()
  //add a user authentication here, if admin more options

}

export default angular.module('jsScrumBoardApp.project', [uiRouter, projectService])
  .config(routes)
  .component('project', {
    template: require('./project.html'),
    controller: ProjectComponent,
    controllerAs: 'vm',
    bindings: {project: '='}
  })
  .name;
