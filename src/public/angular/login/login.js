"use strict";

(function () {

    angular.module('atm.login', [
        'ui.router'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: "angular/login/login.html",
                    controller: "login.ctrl"
                })
            ;
        }])

        .controller("login.ctrl", function($scope, SecurityService, $state, atmAlert) {
            $scope.user = {};

            $scope.login = function () {
                SecurityService.login($scope.user).then(function() {
                    $state.go("ma-hoa");
                }, function() {
                    atmAlert.error("Sai tài khoản hoặc mật khẩu");
                    $scope.user.pass = "";
                })
            };


        })


    ;

})();