'use strict';

angular.module('sossoaApp')
    .controller('ListCtrl', function($scope, ThreadRepository) {
        $scope.threads = ThreadRepository;

        $scope.toggle = function(id) {
            $('#thread-'+id).slideToggle();
        }

        var socket = io();
        socket.on('threads', function(thread) {
            ThreadRepository.add(thread);
            $scope.$apply();
        });
    });
