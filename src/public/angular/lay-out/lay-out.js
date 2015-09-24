"use strict";

(function () {

    angular.module('atm.lay-out', [
    ])

        .run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }])

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