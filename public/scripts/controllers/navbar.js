'use strict';

angular.module('sossoaApp')
    .controller('NavbarCtrl', function($rootScope, $scope, ThreadRepository) {
        $scope.threads = ThreadRepository;

        $scope.toggleDebug = function() {
            $rootScope.hide_debug = !$rootScope.hide_debug;
        };
    });
