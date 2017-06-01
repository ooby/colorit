'use strict';
angular.module('colorit.controllers', ['colorit.services'])
    .controller('AppCtrl', function ($apiEndpoint, $scope, $rootScope, $mdToast, $window, $q, $translate) {
        $rootScope.processing = false;
        $rootScope.language = 'English?';
        $scope.result = {};
        $scope.settings = false;
        $scope.denoise = {};

        $scope.toggleLng = function () {
            if ($rootScope.language === 'English?') {
                $rootScope.language = 'Русский?';
                $translate.use('eng');
            } else {
                $rootScope.language = 'English?';
                $translate.use('rus');
            }
        };

        $scope.uploadStart = function ($flow) {
            $flow.opts.target = 'api/process';
            if ($scope.denoiseCheck) {
                $flow.opts.headers.denoise = $scope.denoiseCheck;
            }
            if ($scope.normalizeCheck) {
                $flow.opts.headers.normalize = $scope.normalizeCheck;
            }
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