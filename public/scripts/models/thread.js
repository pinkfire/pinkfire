'use strict';

angular.module('sossoaApp')
    .factory('ThreadRepository', function() {
        var channels = [];
        var threads = {};

        return {
            channels: function () {
                return channels;
            },

            all: function() {
                return threads;
            },

            clear: function() {
                threads = {};
            },

            addChannel: function(channel) {
                if (channels.indexOf(channel) == -1 && angular.isDefined(channel)) {
                    channels.push(channel);
                }
            },

            add: function(thread) {

                if (channels.indexOf(thread.channel) == -1 && angular.isDefined(thread.channel)) {
                    channels.push(thread.channel);
                }

                var paths = thread.path.split('/'),
                    parentThread = threads;

                thread.date = new Date();
                thread.id = paths[paths.length-1];
                thread.parent = paths[paths.length-2];
                thread.children = {};

                var levelMap = {
                    'primary': 'primary',
                    'default': 'default',

                    'debug': 'info',
                    'info': 'info',
                    'notice': 'info',

                    'warning': 'warning',

                    'error': 'danger',
                    'critical': 'danger',
                    'alert': 'danger',
                    'emergency': 'danger',
                    'danger': 'danger'
                };

                if (levelMap[thread.level]) {
                    thread.level = levelMap[thread.level];
                } else {
                    thread.level = 'info';
                }

                for (var i = 1; i < paths.length - 1; i++) {
                    var parent = paths[i];

                    if (!parentThread[parent]) {
                        parentThread[parent] = {
                            id: parent,
                            parent: paths[i-1],
                            message: '-',
                            level: 'info',
                            application: 'Unknown application',
                            context: [],
                            date: Math.floor(Date.now() / 1000),
                            children: {}
                        };
                    }

                    parentThread = parentThread[parent].children;
                }

                if (parentThread[thread.id]) {
                    thread.children = parentThread[thread.id].children;
                }

                parentThread[thread.id] = thread;
            },

            update: function(threadPatch) {
                var parentThread = threads,
                    paths = threadPatch.path.split('/'),
                    id = paths[paths.length-1];

                for (var i = 1; i < paths.length - 1; i++) {
                    var parent = paths[i];
                    parentThread = parentThread[parent].children;
                }

                $.extend(true, parentThread[id], threadPatch);
            }
        }
    });
