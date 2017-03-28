'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('scrumApp.util', [])
  .factory('Util', UtilService)
  .name;
