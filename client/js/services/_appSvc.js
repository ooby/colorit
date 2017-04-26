'use strict';
angular.module('colorit.services', [])
    .factory('HttpRequestInterceptor', function ($q, $location, $window) {
        var authInterceptorFactory = {};
        authInterceptorFactory.request = function (config) {
            var token = $window.localStorage.getItem('fingerprint');
            if (token) {
                config.headers.fingerprint = token;
            }
            return config;
        };
        authInterceptorFactory.responseError = function (response) {
            if (response.status == 403) { $rootScope.$broadcast('alert', response.message); }
            return $q.reject(response);
        };
        return authInterceptorFactory;
    });