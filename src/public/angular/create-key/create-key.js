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
            $scope.createKey = function () {

                keyPairApi.createKeyPair($scope.passphrase).then(function (resp) {
                    DownloadService.download(resp.data, "privateKey.key");
                })
            }

        })



    ;

})();