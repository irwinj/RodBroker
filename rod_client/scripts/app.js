'use strict';

/**
 * @ngdoc overview
 * @name rodBrokerApp
 * @description
 * # rodBrokerApp
 *
 * Main module of the application.
 */
var app = angular.module('rodBrokerApp', [
  'Devise',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'checklist-model',
  'ngFileUpload'
]);

// const apiEndpoint = "http://localhost:3000/api";
// const rootEndpoint = "http://localhost:3000";
const apiEndpoint = "https://rod-broker-server.herokuapp.com/api";
const rootEndpoint = "https://rod-broker-server.herokuapp.com/";

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
     })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })

    .when('/results', {
      templateUrl: 'views/results.html',
      controller: 'ResultsCtrl'
    })
    .when('/groups', {
      templateUrl: 'views/groups.html',
      controller: 'GroupsCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/builders', {
      templateUrl: 'views/builders.html',
      controller: 'BuildersCtrl'
    })
    .when('/builders/q=:searchQuery', {
      templateUrl: 'views/builders.html',
      controller: 'ResultsCtrl'
    })
    .when('/builders/new', {
      templateUrl: 'views/edit.html',
      controller: 'EditCtrl'
    })
    .when('/builders/:builderId', {
      templateUrl: 'views/show.html',
      controller: 'ShowCtrl'
    })
    .when('/builders/edit/:builderId', {
      templateUrl: 'views/edit.html',
      controller: 'EditCtrl'
    })
    .otherwise({
      templateUrl:  '/404.html'
    });
}]);

app.factory('Group', ['$resource', function($resource) {
  return $resource(apiEndpoint + '/groups/:id.json', null, {
    // 'update': { method:'PUT' }
  })
}]);
app.factory('Builder', ['$resource', function($resource) {
  return $resource(apiEndpoint + '/builders/:id.json', null, {
    'update': { method:'PUT' }
  })
}]);
app.factory('Pole', ['$resource', function($resource) {
  return $resource(apiEndpoint + '/poles/:id.json', null, {
    // 'update': { method:'PUT' }
  })
}]);

app.config(function(AuthProvider) {
  AuthProvider.registerPath(apiEndpoint + '/users.json');
  AuthProvider.loginPath(apiEndpoint + '/users/sign_in.json');
  AuthProvider.logoutPath(apiEndpoint + '/users/sign_out.json');
  AuthProvider.logoutPath(apiEndpoint + '/users/sign_out_post.json');
  AuthProvider.logoutMethod('POST');
});

app.run(['$rootScope', 'Auth', function($rootScope, Auth) {
  Auth.currentUser().then(function(user) {
    $rootScope.currentUser = user;
  });

  $rootScope.isLoggedIn = function() {
    return Auth.isAuthenticated();
  }
}]);
