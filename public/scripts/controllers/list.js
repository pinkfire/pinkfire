'use strict';

angular
    .module('sossoaApp')
    .controller('ListCtrl', function($scope) {
        $scope.threads = {};

        $scope.findByParent = function(val) {
            var res = {};

            angular.forEach($scope.threads, function(thread, key) {
                if (thread.parent === val) {
                    res[key] = thread;
                }
            });

            return res;
        };

        var socket = io();
        socket.on('threads', function(thread) {
            var paths = thread.path.split('/');

            thread.date = new Date();
            thread.id = paths[paths.length-1];
            thread.parent = paths[paths.length-2];

            // Check the complete path exists
            for (var i = 1; i < paths.length-1; i++) {
                var parent = paths[i-1],
                    current = paths[i];

                if (!$scope.threads[current]) {
                    $scope.threads[current] = {
                        id: current,
                        parent: parent,
                        message: '-',
                        application: 'Unknown application',
                        context: [],
                        date: new Date()
                    }
                }
            }

            $scope.threads[thread.id] = thread;
            $scope.$apply();
        });
    });
