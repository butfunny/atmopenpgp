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


        .factory("DownloadService", function() {
            var base64=function(str){
                return window.btoa(unescape(encodeURIComponent(str)));
            };

            return {
                download: function(downloadData, type) {
                    var a = document.createElement('a');
                    a.download = type;
                    var href = "data:application/octet-stream;base64," + base64(downloadData);
                    a.href = href;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            };
        })
    ;

})();