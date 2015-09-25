"use strict";

(function () {

    angular.module('atm.ma-hoa', [
        'ui.router',
        'ui.bootstrap'
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

        .controller("ma-hoa.ctrl", function($scope, User, $state, keyPairApi, userApi, maHoaApi) {

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

            $scope.message = {};


            $scope.sendMessage = function () {
                $scope.message.user_revice_id = $scope.user_selected._id;
                $scope.message.user_revice_email = $scope.user_selected.email;
                maHoaApi.sendMessage($scope.message).then(function (resp){
                    $scope.message.text = "";
                })
            };






        })

    ;

})();