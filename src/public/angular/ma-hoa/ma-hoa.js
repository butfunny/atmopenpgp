"use strict";

(function () {

    angular.module('atm.ma-hoa', [
        'ui.router',
        'ui.bootstrap',
        'ngFileUpload'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('ma-hoa', {
                    url: '/ma-hoa',
                    templateUrl: "/angular/ma-hoa/ma-hoa.html",
                    controller: "ma-hoa.ctrl"
                })
            ;
        }])

        .controller("ma-hoa.ctrl", function($scope) {


        })


        .directive("maHoaNgoaiHeThong", function() {
            return {
                restrict: "E",
                templateUrl: "angular/ma-hoa/ma-hoa-ngoai-he-thong.html",
                link: function($scope, elem, attrs) {

                }
            };
        })


        .directive("maHoaTrongHeThong", function(User, $state, keyPairApi, userApi, maHoaApi, Upload, passPhraseModal, atmAlert) {
            return {
                restrict: "E",
                templateUrl: "angular/ma-hoa/ma-hoa-trong-he-thong.html",
                link: function($scope, elem, attrs) {
                    $scope.User = User;
                    $scope.$watch("::User", function(value) {
                        if (value) {
                            keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                                if (resp.data == "") {
                                    $state.go("create-key");
                                }
                            });

                            userApi.getAllUser().then(function (resp) {
                                $scope.users = resp.data;
                                Cols.removeBy($scope.users, function (u) {return u._id == User.info._id});
                            })
                        }
                    });

                    $scope.message = {};

                    $scope.sendMessage = function (file) {
                        passPhraseModal.show().then(function (passphrase) {
                            $scope.loading = true;
                            $scope.message.passpharese = passphrase;
                            $scope.message.user_revice_id = $scope.user_selected._id;
                            $scope.message.user_revice_email = $scope.user_selected.email;

                            Upload.upload({
                                url: "/api/ma-hoa",
                                fields: $scope.message,
                                file: file
                            }).then(function (resp) {
                                if (resp.error) {
                                    atmAlert.error(resp.error);
                                } else {
                                    $scope.loading = false;
                                    $scope.message.text = "";
                                    atmAlert.success("Tin nhắn gửi thành công");
                                }
                            })
                        });


                    }

                }
            };
        })

    ;

})();