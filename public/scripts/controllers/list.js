'use strict';

angular
    .module('sossoaApp')
    .controller('ListCtrl', function($scope) {
        $scope.threads = {};

        var socket = io();
        socket.on('threads', function(thread) {
            var paths = thread.path.split('/'),
                parentThread = $scope.threads;

            thread.date = new Date();
            thread.id = paths[paths.length-1];
            thread.parent = paths[paths.length-2];
            thread.children = {};

            for (var i = 1; i < paths.length - 1; i++) {
                var parent = paths[i];

                if (!parentThread[parent]) {
                    parentThread[parent] = {
                        id: parent,
                        parent: paths[i-1],
                        message: '-',
                        application: 'Unknown application',
                        context: [],
                        date: new Date(),
                        children: {}
                    };
                }

                parentThread = parentThread[parent].children;
            }

            if (parentThread[thread.id]) {
                thread.children = parentThread[thread.id].children;
            }

            parentThread[thread.id] = thread;
            $scope.$apply();
        });
    });
