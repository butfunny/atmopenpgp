"use strict";

(function () {

    angular.module("atm.active-account", [
        "ui.router"
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state("active-account", {
                    url: "/active-account",
                    templateUrl: "/angular/active-account/active-account.html",
                    controller: "active-account.ctrl"
                })
            ;
        }])

        .controller("active-account.ctrl", function($scope, userApi, atmAlert, $state, User) {

            $scope.activeAccount = function () {
                userApi.activeUser($scope.activeCode).then(function (resp) {
                    if (resp.data) {
                        atmAlert.success("Kích hoạt thành công!");
                        User.info.active = "true";
                        $state.go("create-key");
                    } else {
                        atmAlert.error("Sai mã kích hoạt");
                    }
                })
            };

            $scope.resendActiveCode = function (){
                userApi.resendActiveCode().then(function(resp) {
                    atmAlert.info("Mã kích hoạt đã được gửi tới tài khoản của bạn, vui lòng kiểm tra email.")
                })
            }
        })

    ;

})();