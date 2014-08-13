'use strict';

angular.module('angular-rte', [
  'rte.module'
]).
controller('DemoCtrl', function ($scope, $sce) {
  $scope.demoContent = $sce.trustAsHtml('<div>Hello, <b>world</b></div>');
});