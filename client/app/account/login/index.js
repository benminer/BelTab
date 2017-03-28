'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('sandbox3App.login', [])
  .controller('LoginController', LoginController)
  .name;
