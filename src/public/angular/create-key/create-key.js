"use strict";

(function () {

    angular.module('atm.crate-key', [
        'ui.router'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('create-key', {
                    url: '/create-key',
                    templateUrl: "/angular/create-key/create-key.html",
                    controller: "create-key.ctrl"
                })
            ;
        }])

        .controller("create-key.ctrl", function($scope, $state, keyPairApi, User, DownloadService, atmAlert) {

            $scope.User = User;

            $scope.$watch("::User", function(value) {
                if (value) {
                    keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                        if (resp.data) {
                            $state.go("thong-tin-ca-nhan");
                        } else {
                            if (User.info.active != "true") {
                                $state.go("active-account");
                            }
                        }
                    });
                }
            });

            $scope.bits = [512,1024,2048];

            $scope.key = {
                bit: $scope.bits[0]
            };

            $scope.createKey = function () {

                $scope.loading = true;
                keyPairApi.createKeyPair($scope.key).then(function (resp) {
                    $scope.loading = false;
                    atmAlert.success("Tạo key thành công. Private Key đã tự động download về máy bạn và bạn có thể download publicKey bất kì lúc nào");
                    DownloadService.download(resp.data, "privateKey.key");
                    $state.go("thong-tin-ca-nhan");
                })
            }

        })



    ;

})();