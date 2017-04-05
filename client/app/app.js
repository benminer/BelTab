'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';
import constants from './app.constants';

import account from './account';
import admin from './admin';
import main from './main/main.component';
import teams from './teams/teams.component';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';

import _Auth from '../services/auth/auth.module';
import util from '../services/util/util.module';
import socket from '../services/socket/socket.service';
import project from '../services/project/project.service'
import story from '../services/story/story.service'

import './app.scss';

angular.module('scrumApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, navbar, footer, main, constants, socket, util,
  teams, project
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['scrumApp'], {
      strictDi: true
    });
  });
