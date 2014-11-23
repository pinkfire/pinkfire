'use strict';

angular
    .module('sossoaApp')
    .controller('ListCtrl', function($scope) {
        $scope.threads = [];

        $scope.withParents = function(val) {
            var res = [];

            $scope.threads.forEach(function(thread) {
                if (thread.parent === val) {
                    res.push(thread);
                }
            });

            return res;
        };

        var socket = io();
        socket.on('threads', function(thread) {
            console.log(thread);

            thread.date = new Date();

            $scope.threads.push(thread);
            $scope.$apply();
        });
    });
