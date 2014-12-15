'use strict';

angular.module('sossoaApp')
    .controller('ListCtrl', function($scope, ThreadRepository) {
        $scope.threads = ThreadRepository;

        var socket = io();
        socket.on('threads', function(thread) {
            ThreadRepository.add(thread);
            $scope.$apply();
        });
    });
