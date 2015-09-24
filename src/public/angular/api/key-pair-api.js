"use strict";

(function () {

    angular.module('atm.key-pair-api', [
    ])
        .factory("keyPairApi", function($http) {
            return {
                getKeyPair: function (user_id) {
                    return $http.get("/api/key-pair/" +user_id);
                },
                createKeyPair: function (passphrase) {
                    return $http.post("/api/key-pair/create/" + passphrase);
                },
                getPublicKey: function (user_id) {
                    return $http.get("/api/key-pair/publicKey/" + user_id);
                },
                getPrivateKey: function (passPhrase) {
                    return $http.get("/api/key-pair/privateKey/" + passPhrase);
                }
            };
        })
    ;

})();