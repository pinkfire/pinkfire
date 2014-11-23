'use strict';

angular
    .module('sossoaApp', [
        'ngRoute'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'ListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
