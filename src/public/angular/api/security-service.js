
"use strict";

(function () {

    angular.module('atm.security', [
    ])
        .factory("User", function() {
            return {
                isLogged: false
            };
        })

        //.run(function(SecurityService, User, $rootScope) {
        //    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        //        if (!User.isLogged) {
        //            if (toState.name == "login") {
        //                ;
        //            } else {
        //                event.preventDefault();
        //            }
        //        }
        //    });
        //
        //
        //
        //})

        .factory("SecurityService", function(User,$http,$state, $q) {

            //function fetchUser(){
            //    return $http.get("/api/account").success(function(data){
            //        if(data == ""){
            //            ObjectUtil.clear(User);
            //            $state.go("login");
            //        }else{
            //            User.isLogged = true;
            //            User.name = data.name;
            //            $state.go("ma-hoa");
            //        }
            //    })
            //
            //}
            //fetchUser();





            return {
                login: function(cred){
                    var defer = $q.defer();

                    $http.post("/api/security/login", cred).success(function(data){
                        if(data == ""){
                            ObjectUtil.clear(User);
                            defer.reject();
                        }else{
                            User.isLogged = true;
                            User.info = data.info;
                            defer.resolve();

                        }
                    });
                    return defer.promise;

                },
                logout: function(){
                    return $http.post("/api/security/logout").success(function(){
                        ObjectUtil.clear(User);
                        $state.go("login");
                    })
                }
            };
        })
    ;

})();