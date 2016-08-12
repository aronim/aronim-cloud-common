!function () {
    "use strict";

    define(["jquery",
            "angular",
            "common/js/aronim.cloud.common",
            "text!common/template/aronim.cloud.menu.html"],

        function ($, angular, kdc, kdcMenuTemplate) {

            angular.module("aronim.cloud.menu", [])
                .factory("acMenuItemsService", acMenuItemsService)
                .directive("acMenu", acMenu);

            function acMenuItemsService($q, $http) {
                return {
                    list: function () {

                        var deferred = $q.defer();

                        deferred.resolve([
                            {name: "Users", path: "#/users", module: "aronim.cloud.users", element: "ac-users"},
                            {name: "Components", path: "#/components", module: "aronim.cloud.users", element: "ac-users"}
                        ]);

                        return deferred.promise;
                    }
                }
            }

            function acMenu(acMenuItemsService) {
                return {
                    restrict: "E",
                    template: kdcMenuTemplate,
                    controller: function ($scope) {

                        var refreshMenuItems = function () {
                            acMenuItemsService
                                .list()
                                .then(function (menuItems) {
                                    $scope.menuItems = menuItems;
                                }, function (errorMessage) {
                                    $scope.errorMessage = errorMessage;
                                });
                        };

                        refreshMenuItems();
                    }
                }
            }
        }
    );
}();