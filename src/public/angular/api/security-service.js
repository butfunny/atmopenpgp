
"use strict";

(function () {

    angular.module('atm.security', [
    ])
        .factory("User", function() {
            return {
                isLogged: false
            };
        })



        .factory("SecurityService", function(User,$http,$state, $q) {

            function fetchUser(){
                return $http.get("/api/security/account").success(function(data){
                    if(data == ""){
                        ObjectUtil.clear(User);
                        $state.go("login");
                    }else{
                        User.isLogged = true;
                        User.info = data;
                        $state.go("ma-hoa");
                    }
                })

            }
            fetchUser();





            return {
                login: function(cred){
                    var defer = $q.defer();

                    $http.post("/api/security/login", cred).success(function(data){
                        if(data == ""){
                            ObjectUtil.clear(User);
                            defer.reject();
                        }else{
                            User.isLogged = true;
                            User.info = data;
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
                },
                checkEmailAvailable: function (email) {
                    return $http.post("/api/security/check-email-available/"+email);
                },
                register: function (user) {
                    var defer = $q.defer();

                    $http.post("/api/security/register", user).then(function (resp) {
                        if(resp.data == ""){
                            ObjectUtil.clear(User);
                            defer.reject();
                        }else{
                            User.isLogged = true;
                            User.info = resp.data;
                            defer.resolve();
                        }
                    });


                    return defer.promise;

                }
            };
        })
    ;

})();