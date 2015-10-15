"use strict";

(function () {

    angular.module('atm.thong-tin-ca-nhan', [
        'ui.router'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('thong-tin-ca-nhan', {
                    url: '/thong-tin-ca-nhan',
                    templateUrl: "/angular/thong-tin-ca-nhan/thong-tin-ca-nhan.html",
                    controller: "thong-tin-ca-nhan.ctrl"
                })
            ;
        }])

        .controller("thong-tin-ca-nhan.ctrl", function($scope, User, keyPairApi, DownloadService) {

            $scope.User = User;
            $scope.$watch("::User", function(value) {
                if (value) {

                    keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                        if (resp.data == "") {
                            $scope.haveKeyPair = false;
                        } else {
                            $scope.haveKeyPair = true;
                        }
                    });

                }
            });


            $scope.downloadKey = function () {
                keyPairApi.downloadPublicKey(User.info._id).then(function(resp) {
                    DownloadService.download(resp.data, "publicKey.csr");
                })
            }


        })

    ;

})();