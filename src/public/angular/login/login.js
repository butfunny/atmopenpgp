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

        .controller("login.ctrl", function($scope, SecurityService, $state) {
            $scope.user = {
                email: "shi.iluka94@gmail.com",
                pass: "123123"
            };

            $scope.login = function () {
                SecurityService.login($scope.user).then(function() {
                    $state.go("ma-hoa");
                }, function() {
                    console.log("error!!");
                })
            };


        })


        .directive("register", function(SecurityService) {

            var emailAvailableCache = {};
            var emailAvailableCheck = function(email) {
                if (email == null) {
                    return 2;
                }

                var status = emailAvailableCache[email];

                if ( status == null ) {
                    emailAvailableCache[email] = 2;

                    SecurityService.checkEmailAvailable(email).then(function(resp) {
                        emailAvailableCache[email] = resp.data.value ? 1 : 0;
                    });

                    return 2;
                } else {
                    return status;
                }

            };


            return {
                restrict: "E",
                templateUrl: "angular/login/register.html",
                link: function($scope, elem, attrs) {
                    $scope.register = {};

                    $scope.emailAvailable = emailAvailableCheck;

                    $scope.dangky = function () {
                        SecurityService.register($scope.register).then(function (resp) {
                            console.log(resp.data);
                        })
                    }

                }
            };
        })

    ;

})();