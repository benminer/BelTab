'use strict';
const angular = require('angular');

export class storyComponent {

  description= [{
    title: 'Test'
  }]

  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('story', [])
  .component('story', {
    template: require('./story.html'),
    bindings: {
      doc: '='
    },
    controller: storyComponent,
    controllerAs: 'vm'
  })
  .name;
