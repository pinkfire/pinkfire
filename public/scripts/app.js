'use strict';

angular
    .module('sossoaApp', [
        'ngRoute',
        'ui.bootstrap',
        'ngPrettyJson'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/:by_channel?', {
                templateUrl: 'views/list.html',
                controller: 'ListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    })
    .run(function($rootScope) {
        $rootScope.Utils = {
            keys : Object.keys
        };
    });
