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

        .controller("thong-tin-ca-nhan.ctrl", function($scope, User, keyPairApi, passPhraseModal) {

            $scope.User = User;
            $scope.$watch("User", function(value) {
                if (value) {

                    keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                        if (resp.data == "") {
                            $scope.haveKeyPair = false;
                        } else {
                            $scope.haveKeyPair = true;
                            keyPairApi.getPublicKey($scope.User.info._id).then(function (resp) {
                                $scope.publicKey = resp.data.publicKey;
                            })
                        }
                    });

                }
            });


            $scope.viewPrivateKey = function () {
                passPhraseModal.show().then(function (data) {
                    $scope.privateKey = data.privateKey.privateKey;
                })
            }


        })

    ;

})();