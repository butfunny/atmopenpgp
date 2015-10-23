"use strict";

(function () {

    angular.module('atm.user-api', [
    ])
        .factory("userApi", function($http) {
            return {
                getAllUser: function () {
                    return $http.get("api/user/all-user");
                },
                activeUser: function (code) {
                    return $http.post("api/user/active-user/" + code);
                },
                resendActiveCode: function () {
                    return $http.get("api/user/resend-active");
                }
            };
        })
    ;

})();