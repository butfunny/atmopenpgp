"use strict";

(function () {

    angular.module('atm.giai-ma-api', [
    ])
        .factory("giaiMaApi", function($http) {
            return {
                checkSign: function (sign) {
                    return $http.post("/api/giai-ma/sign", sign);
                },
                getPlaintext: function (info) {
                    return $http.post("/api/giai-ma/message", info);
                }
            };
        })
    ;

})();