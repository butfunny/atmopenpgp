"use strict";

(function () {

    angular.module('atm.theme', [
    ])
        .directive("checkSame", function() {
            return {
                restrict: "A",
                require: "ngModel",
                link: function($scope, elem, attrs, ngModelCtrl) {
                    ngModelCtrl.$validators.checkSame = function(modelValue){
                        var ten = modelValue;
                        var pass = $scope.$eval(attrs.checkSame);
                        if(ten == pass) return true;
                        else return false;
                    }
                }
            };
        })
    ;

})();