'use strict';

angular.module('sossoaApp')
    .factory('ThreadRepository', function() {
        var channels = [];
        var threads = {};
        var hiddenPrefix = "_pinkfire_";
        var withDebugThreads = false;

        return {
            withDebug: function() {
                return withDebugThreads;
            },

            channels: function() {
                return channels;
            },

            all: function() {
                return threads;
            },

            clear: function() {
                threads = {};
                withDebugThreads = false;
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
                thread.hidden = {};

                // Remove hidden keys from thread context
                angular.forEach(thread.context, function(value, key) {
                    if (key.substring(0, hiddenPrefix.length) === hiddenPrefix) {
                        thread.hidden[key.substring(hiddenPrefix.length)] = value;
                        delete thread.context[key];
                    }
                });

                if (thread.hidden.is_debug) {
                    withDebugThreads = true;
                }

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

                // retrocompatibility with SosSoaBundle
                if (typeof thread.links === 'undefined') {
                    thread.links = {};
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
                            date: new Date(),
                            children: {},
                            links: {}
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

                threadPatch.date = new Date();

                $.extend(true, parentThread[id], threadPatch);
            }
        }
    });
