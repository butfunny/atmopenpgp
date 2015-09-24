"use strict";

(function () {

    angular.module('atm.lay-out', [
    ])
        .directive("atmHeader", function(User,SecurityService) {
            return {
                restrict: "A",
                scope: true,
                link: function($scope, elem, attrs) {
                    $scope.User = User;
                    $scope.logout = SecurityService.logout;
                }
            };
        })
    ;

})();