'use strict';

/**
 * @ngdoc function
 * @name barcelandoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barcelandoApp
 */
angular.module('barcelandoApp')
  .controller('MainCtrl', function ($scope, facebookService, $window) {
       $scope.openLink = function(link) {
        $window.open(link, "_blank");
    };
    $scope.events = null;
    facebookService.callApi("/Barcelandoculturecrawl/feed/").then(function(response) {
        $scope.events = response.data;
    });
  });
