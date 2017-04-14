'use strict';
var apiURL = window.location.origin + '/';
var fp = new Fingerprint2();
angular.module('colorit', ['flow', 'ngRoute', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'ngAria', 'ngAnimate',
    'colorit.services', 'colorit.controllers'])
    .constant('$apiEndpoint', {
        url: apiURL
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey', {
                'default': '800',
                'hue-1': '400',
                'hue-2': '600',
                'hue-3': 'A100'
            })
            .accentPalette('orange');
        $mdThemingProvider.theme('second')
            .primaryPalette('blue-grey', {
                'default': 'A400',
                'hue-1': 'A100',
                'hue-2': 'A200',
                'hue-3': 'A100'
            })
            .accentPalette('orange');
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('HttpRequestInterceptor');
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/body.html',
                controller: 'AppCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });