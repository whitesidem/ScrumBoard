/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />
/// <reference path="Dialogs/SimpleEnterStringDialogController.js" />

SkilzJs.namespace('controller');
SkilzJs.controller.CreateListDialogController = (function ($scope, $dialog, $http) {

    $scope.dialogDone = false;
    $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/Templates/ScrumBoard/CreateListItemDialog.htm',
        controller: SkilzJs.controller.shared.dialogs.SimpleEnterStringDialogController,
        resolve: { dialogModel: function () { return { title: "Create New List", text: "Enter title for new list" }; } }
    };


    $scope.openDialog = function () {
        var d = $dialog.dialog($scope.opts);
        d.open().then(function (listTitle) {
            $scope.dialogDone = true;
            if (listTitle) {
                $http.post("api/ScrumBoardRestApi/CreateList", { "title": listTitle });
            }
        });
    };

});

SkilzJs.controller.CreateListDialogController.$inject = ["$scope", "$dialog", "$http"];
