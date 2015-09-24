"use strict";

(function () {

    angular.module('atm.ma-hoa-api', [
    ])
        .factory("maHoaApi", function($http) {
            return {
                sendMessage : function(message) {
                    return $http.post("/api/ma-hoa", message);
                }
            };
        })
    ;

})();