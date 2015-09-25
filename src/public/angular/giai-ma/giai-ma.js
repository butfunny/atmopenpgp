"use strict";

(function () {

    angular.module('atm.giai-ma', [
        'ui.router'
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

        .controller("giai-ma.ctrl", function($scope, User, userApi, keyPairApi, giaiMaApi) {

            $scope.User = User;
            $scope.$watch("User", function(value) {
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

            $scope.validSign = false;

            $scope.checkSign = function () {
                var sign = {
                    sender_id :$scope.user_selected._id,
                    signMessage: $scope.signMessage
                };
                giaiMaApi.checkSign(sign).then(function (resp) {
                    $scope.validSign = resp.data.signatures[0].valid;
                    $scope.textOfSign = resp.data.text;
                })
            };

            $scope.reWrite = function () {
                $scope.validSign = false;
            }

        })

    ;

})();