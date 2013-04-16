/// <reference path="../../External/Angular/angular.js" />
/// <reference path="../global.js" />


SkilzJs.namespace('controller.shared.dialogs');

// the dialog is injected in the specified controller
SkilzJs.controller.shared.dialogs.SimpleEnterStringDialogController = (function ($scope, dialog, dialogModel) {

    $scope.listTitle = "Default list title";
    $scope.dialogModel = dialogModel;
    $scope.close = function () {
        dialog.close($scope.listTitle);
    };
    $scope.cancel = function () {
        dialog.close();
    };
});

SkilzJs.controller.shared.dialogs.SimpleEnterStringDialogController.$inject = ["$scope", "dialog", "dialogModel"];