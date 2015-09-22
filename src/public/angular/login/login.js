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

        .controller("login.ctrl", function($scope, SecurityService) {
            $scope.user = {};

            $scope.login = function () {
                SecurityService.login($scope.user).then(function() {
                    console.log("Success!!");
                }, function() {
                    console.log("error!!");
                })
            };


        })


        .directive("register", function() {
            return {
                restrict: "E",
                templateUrl: "angular/login/register.html",
                link: function($scope, elem, attrs) {

                }
            };
        })

    ;

})();