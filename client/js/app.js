'use strict';
var apiURL = window.location.origin + '/';
angular.module('colorit', ['pascalprecht.translate', 'flow', 'ngSanitize', 'ngRoute', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'ngAria', 'ngAnimate',
    'colorit.services', 'colorit.controllers'])
    .constant('$apiEndpoint', {
        url: apiURL
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey', {
                'default': '800',
                'hue-1': '400',
                'hue-2': '700',
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
    .config(function ($translateProvider) {
        $translateProvider.translations('rus', {
            CHOOSE: 'Колоризация черно-белых фотографий. Выберите свое фото',
            CREDS: 'Качество колоризации зависит от качества черно-белой фотографии',
            BUTTON: 'Выбрать файл'
        });
        $translateProvider.translations('eng', {
            CHOOSE: 'Black and white photo colorization. Choose your photo',
            CREDS: 'Quality of colorization depends on quality of your black and white photo',
            BUTTON: 'Select file'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('rus');
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