"use strict";

(function () {

    angular.module('atm.nhap-passphrase', [
        'ui.bootstrap',
        'ngAnimate'
    ])
        .factory("passPhraseModal", function($modal) {
            return {
                show: function () {
                    return $modal.open({
                        templateUrl: "/angular/nhap-passphrase/nhap-passphrase.html",
                        controller: "nhap-passphrase.ctrl"
                    }).result
                }
            };
        })

        .controller("nhap-passphrase.ctrl", function($scope, $modalInstance, keyPairApi) {

            $scope.ok = function () {
                keyPairApi.getPrivateKey($scope.passphrase).then(function (resp) {
                    if (resp.data.error) {
                        $scope.gotError = true;
                    } else {
                        $modalInstance.close(resp.data);
                    }
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss();
            }

        })
    ;



})();