"use strict";

(function () {

    angular.module('atm.ma-hoa', [
        'ui.router'
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

        .controller("ma-hoa.ctrl", function($scope, User, $state, keyPairApi) {

            $scope.User = User;
            $scope.$watch("User", function(value) {
                if (value) {
                    keyPairApi.getKeyPair(User.info._id).then(function (resp) {
                        if (resp.data == "") {
                            $state.go("create-key");
                        }
                    })
                }
            });




        })

    ;

})();