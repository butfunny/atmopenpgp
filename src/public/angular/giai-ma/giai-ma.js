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

        .controller("giai-ma.ctrl", function($scope, User, userApi, keyPairApi, $state) {

            $scope.User = User;
            $scope.$watch("::User", function(value) {
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
                scope: false,
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


                }
            };
        })

        .directive("giaiMaNgoaiHeThong", function(Upload, atmAlert) {
            return {
                restrict: "E",
                scope: false,
                templateUrl: "angular/giai-ma/giai-ma-ngoai-he-thong.html",
                link: function($scope, elem, attrs) {
                    $scope.validSignOut = null;
                    $scope.messageOut = {};

                    $scope.checkSign = function () {
                        Upload.upload({
                            url: "api/giai-ma/ngoai-he-thong/sign",
                            fields: $scope.messageOut,
                            file: $scope.publicKeySign
                        }).then(function (resp) {
                            $scope.validSignOut = resp.data.signatures[0].valid;
                            $scope.textInMesasge = resp.data.text;
                            if ($scope.validSignOut) {
                                atmAlert.success("Chữ ký chính xác với public key, với đúng nội dung là: " + $scope.textInMesasge);
                            } else {
                                atmAlert.error("Sai chữ ký !! ");
                            }
                        })
                    }

                }
            };
        })


        .directive("giaiMaPgpMessage", function(Upload, passPhraseModal, atmAlert) {
            return {
                restrict: "E",
                scope: false,
                templateUrl: "angular/giai-ma/giai-ma-pgp-message.html",
                link: function($scope, elem, attrs) {
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
                                    $scope.encryptMessage.pgpMessage = "";
                                }
                            })

                        });
                    }
                }
            };
        })

    ;

})();