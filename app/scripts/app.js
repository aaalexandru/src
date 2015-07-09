'use strict';

/**
 * @ngdoc overview
 * @name barcelandoApp
 * @description
 * # barcelandoApp
 *
 * Main module of the application.
 */
angular
  .module('barcelandoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run( function($window) {
    $window.addToHomescreen({
        debug: false
    });
}).factory("facebookService",  function($q) {
    var token = "?&access_token=1612045092417575|6d0698addfd3d63060946506b5cbb461";
    return {
        callApi: function(call, d) {
            d = d || $q.defer();
            window.deFB.then(function(fbapi) {
                fbapi.api(call + token, function(response) {
                    if(!fbapi || fbapi.error ){
                        d.reject("Error occured");
                    } else { 
                     d.resolve(response);
                   }
                });
            });
            return d.promise;
        }
    };
});
