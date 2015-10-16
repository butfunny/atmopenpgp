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
                            atmAlert.success("Tạo key thành công. Private Key đã tự động download về máy bạn và bạn có thể download publicKey bất kì lúc nào");
                            $state.go("thong-tin-ca-nhan");
                        }
                    });
                }
            });

            $scope.createKey = function () {

                $scope.loading = true;
                keyPairApi.createKeyPair($scope.passphrase).then(function (resp) {
                    $scope.loading = false;
                    DownloadService.download(resp.data, "privateKey.key");
                    $state.go("thong-tin-ca-nhan");
                })
            }

        })



    ;

})();