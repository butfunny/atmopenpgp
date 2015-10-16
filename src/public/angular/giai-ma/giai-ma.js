"use strict";

(function () {

    angular.module('atm.giai-ma', [
        'ui.router',
        'ngFileUpload'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('giai-ma', {
                    url: '/giai-ma',
                    templateUrl: "/angular/giai-ma/giai-ma.html",
                    controller: "giai-ma.ctrl"
                })
            ;
        }])

        .controller("giai-ma.ctrl", function($scope, User, userApi, keyPairApi) {

            $scope.User = User;
            $scope.$watch("User", function(value) {
                if (value) {
                    keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                        if (resp.data == "") {
                            $state.go("create-key");
                        }
                    });
                }
            });



        })


        .directive("giaiMaTrongHeThong", function(userApi, giaiMaApi, User, passPhraseModal, Upload, atmAlert) {
            return {
                restrict: "E",
                templateUrl: "angular/giai-ma/giai-ma-trong-he-thong.html",
                link: function($scope, elem, attrs) {

                    userApi.getAllUser().then(function (resp) {
                        $scope.users = resp.data;
                        Cols.removeBy($scope.users, function (u) {return u._id == User.info._id});
                    });

                    $scope.message = {};

                    $scope.validSign = null;

                    $scope.firstStep = function () {
                        $scope.message.user_recive_id = $scope.user_selected._id;
                        giaiMaApi.checkSign($scope.message).then(function (resp) {
                            $scope.validSign = resp.data.signatures[0].valid;
                            $scope.textInMesasge = resp.data.text;
                            if ($scope.validSign) {
                                atmAlert.success("Chữ ký chính xác với public key, với đúng nội dung là: " + $scope.textInMesasge);
                            } else {
                                atmAlert.error("Sai chữ ký !! ");
                            }

                        })

                    };

                    $scope.encryptMessage = {};

                    $scope.decryptMessage = function () {

                        passPhraseModal.show().then(function (passphrase) {
                            $scope.encryptMessage.passphrase = passphrase;
                            Upload.upload({
                                url: "api/giai-ma/trong-he-thong/message",
                                fields: $scope.encryptMessage,
                                file: $scope.privateKeyUser
                            }).then(function (resp) {
                                if (_.isEmpty(resp.data)) {
                                    atmAlert.error("Private Key không chính xác!!!");
                                }else {
                                    $scope.pgpMessage = resp.data;

                                }
                            })

                        });
                    }

                }
            };
        })

    ;

})();