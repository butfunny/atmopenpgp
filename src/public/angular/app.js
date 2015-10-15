"use strict";

(function () {

    angular.module('atm.app', [
        'atm.login',
        'atm.ma-hoa',
        'atm.crate-key',
        'atm.thong-tin-ca-nhan',
        'atm.giai-ma',


        'atm.lay-out',
        'atm.nhap-passphrase',
        'atm.theme',

        'atm.security',
        'atm.key-pair-api',
        'atm.user-api',
        'atm.ma-hoa-api',
        'atm.giai-ma-api'
    ])

    ;

})();