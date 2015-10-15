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

        .controller("create-key.ctrl", function($scope, $state, keyPairApi, User, DownloadService) {

            $scope.User = User;

            $scope.$watch("::User", function(value) {
                if (value) {
                    keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                        if (resp.data) {
                            $state.go("thong-tin-ca-nhan");
                        }
                    });
                }
            });

            $scope.createKey = function () {

                keyPairApi.createKeyPair($scope.passphrase).then(function (resp) {
                    DownloadService.download(resp.data, "privateKey.key");
                    $state.go("thong-tin-ca-nhan");
                })
            }

        })



    ;

})();