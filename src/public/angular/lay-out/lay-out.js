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

        .factory("atmAlert", function () {

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "2000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            return {
                showAlert: function (type, message) {
                    toastr[type](message);
                },
                success: function (message) {
                    toastr["success"](message);
                },
                error: function (message) {
                    toastr["error"](message);
                },
                info: function (message) {
                    toastr["info"](message);
                },
                warning: function (message) {
                    toastr["warning"](message);
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
        });


    ;

})();