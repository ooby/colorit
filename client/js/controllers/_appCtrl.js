'use strict';
angular.module('workaday.controllers', ['workaday.services'])
    .controller('AppCtrl', function ($apiEndpoint, $scope, $rootScope, $mdToast, $window, $q, Process) {
        $rootScope.processing = false;
        $scope.result = {};
        var fpProc = function () {
            var d = $q.defer();
            fp.get(function (r, c) {
                d.resolve(r);
            });
            return d.promise;
        };
        $scope.init = function () {
            fpProc()
                .then(function (d) {
                    $window.localStorage.setItem('fingerprint', d);
                    Process.get();
                });
        };
        $scope.uploadStart = function ($flow) {
            $flow.opts.target = "api/process";
            $flow.opts.headers = { 'fingerprint': $window.localStorage.getItem('fingerprint') };
            $flow.opts.testChunks = false;
        };
        $scope.fileUploadSucces = function ($file, $message) {
            $rootScope.processing = false;
            var q1 = document.querySelector('#result');
            var e1 = angular.element(q1);
            e1.attr('src', 'data:image/png;base64,' + $message);
        };
        $scope.fileUploadsComplete = function () {
        };
        $scope.uploadFiles = function ($file, $message, $flow) {
            //Uploading
            $rootScope.$flow = $flow;
            $rootScope.$flow.upload();
            $rootScope.processing = true;
        };
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function () {
            sanitizePosition();
            return Object.keys($scope.toastPosition)
                .filter(function (pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) { current.top = false; }
            if (current.top && last.bottom) { current.bottom = false; }
            if (current.right && last.left) { current.left = false; }
            if (current.left && last.right) { current.right = false; }
            last = angular.extend({}, current);
        }
        $rootScope.$on('alert', function (event, data) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(data)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
            );
        });
    });