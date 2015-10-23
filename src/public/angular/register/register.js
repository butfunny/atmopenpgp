"use strict";

(function () {

    angular.module('atm.register', [
        'ui.router'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('register', {
                    url: '/register',
                    templateUrl: "angular/register/register.html",
                    controller: "register.ctrl"
                })
            ;
        }])

        .controller("register.ctrl", function($scope, SecurityService, $state, atmAlert) {
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

            $scope.register = {};

            $scope.emailAvailable = emailAvailableCheck;

            $scope.dangky = function () {
                SecurityService.register($scope.register).then(function (resp) {
                    atmAlert.success("Đăng ký thành công");
                    $state.go("active-account");
                })
            }
        })

    ;

})();