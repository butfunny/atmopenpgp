"use strict";

(function () {

    angular.module('atm.key-pair-api', [
    ])
        .factory("keyPairApi", function($http) {
            return {
                getKeyPair: function (user_id) {
                    return $http.get("/api/key-pair/" +user_id);
                },
                createKeyPair: function (key) {
                    return $http.post("/api/key-pair/create",key);
                },
                downloadPublicKey: function (user_id) {
                    return $http.get("/api/key-pair/publicKey/" + user_id);
                },
                checkPassphrase: function (passphrase) {
                    return $http.get("/api/key-pair/passphrase/" + passphrase)
                }

            };
        })
    ;

})();