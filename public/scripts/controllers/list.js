'use strict';

angular.module('sossoaApp')
    .controller('ListCtrl', function($rootScope, $scope, ThreadRepository, $routeParams) {
        $scope.threads = ThreadRepository;

        $rootScope.by_channel = $routeParams.by_channel;
        ThreadRepository.addChannel($rootScope.by_channel);

        $scope.toggle = function(id) {
            $('#thread-'+id).slideToggle();
        };

        var socket = io();

        socket.on('/threads/post', function(thread) {
            ThreadRepository.add(thread);
            $scope.$apply();
        });

        socket.on('/threads/patch', function(thread) {
            ThreadRepository.update(thread);
            $scope.$apply();
        });
    });
