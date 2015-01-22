'use strict';

angular.module('sossoaApp')
    .controller('NavbarCtrl', function($rootScope, $scope, ThreadRepository) {

        $scope.clear = function() {
            ThreadRepository.clear();
        };

        $scope.channels = ThreadRepository.channels();
    });
