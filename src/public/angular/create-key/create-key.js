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

        .controller("create-key.ctrl", function($scope, $state, keyPairApi, $http, User) {

            $scope.User = User;
            $scope.createKey = function () {
                //$http.get(User.info._id + '_privateKey.key');

                keyPairApi.createKeyPair($scope.passphrase).then(function (resp) {
                    //$http.get(User.info._id + '_privateKey.key');
                })
            }

        })



    ;

})();