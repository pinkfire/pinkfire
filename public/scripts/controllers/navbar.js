'use strict';

angular.module('sossoaApp')
    .controller('NavbarCtrl', function($scope, ThreadRepository) {

        $scope.clear = function() {
            ThreadRepository.clear();
        }
    });
