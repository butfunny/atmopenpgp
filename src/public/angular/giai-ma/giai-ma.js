"use strict";

(function () {

    angular.module('atm.giai-ma', [
        'ui.router'
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('giai-ma', {
                    url: '/giai-ma',
                    templateUrl: "/angular/giai-ma/giai-ma.html",
                    controller: "giai-ma.ctrl"
                })
            ;
        }])

        .controller("giai-ma.ctrl", function($scope) {

        })

    ;

})();