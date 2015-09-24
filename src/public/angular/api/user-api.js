"use strict";

(function () {

    angular.module('atm.user-api', [
    ])
        .factory("userApi", function($http) {
            return {
                getAllUser: function () {
                    return $http.get("api/user/all-user");
                }
            };
        })
    ;

})();