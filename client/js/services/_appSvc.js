'use strict';
angular.module('workaday.services', [])
    .factory('Process', function ($q, $http, $apiEndpoint, $window, $rootScope) {
        var processFactory = {};
        processFactory.get = function () {
            var d = $q.defer();
            $http.get($apiEndpoint.url + 'api/process')
                .success(function (r) {
                    if (r.success) { d.resolve(r.data); }
                    else { $rootScope.$broadcast('alert', r.message); }
                })
                .error(function (m, c) {
                    $rootScope.$broadcast('alert', m);
                });
            return d.promise;
        };
        return processFactory;
    })
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