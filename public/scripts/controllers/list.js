'use strict';

angular.module('sossoaApp')
    .controller('ListCtrl', function($rootScope, $scope, ThreadRepository, $routeParams) {
        $scope.threads = ThreadRepository;

        $rootScope.by_channel = $routeParams.by_channel;
        ThreadRepository.addChannel($rootScope.by_channel);

        $scope.listFilter = function(element) {
            if ($rootScope.by_channel && element.channel !== $rootScope.by_channel) {
                return false;
            }

            if ($rootScope.hide_debug && element.hidden.is_debug) {
                return false;
            }

            return true;
        };

        $scope.toggle = function(id) {
            $('#thread-'+id).slideToggle();
        };

        $scope.isString = function(data) {
            return (typeof data === 'string');
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
