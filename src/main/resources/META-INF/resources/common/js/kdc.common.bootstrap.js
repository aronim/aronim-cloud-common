!function () {
    "use strict";

    define(["domReady", "jquery"],
        function (domReady, $) {
            domReady(function () {

                window.kdc = window.kdc || {};
                window.kdc.bootstrap = window.kdc.bootstrap || {};
                window.kdc.bootstrap.done = false;

                $("[data-kdc-module]").each(function (index, element) {

                    var $element = $(element);
                    var module = $element.attr("data-kdc-module");

                    var moduleName = module.substr(module.lastIndexOf("/") + 1);

                    require(["angular", module], function (angular) {
                        angular.bootstrap($element, [moduleName])
                    })
                });

                window.kdc.bootstrap.done = true;
            })
        }
    );
}();