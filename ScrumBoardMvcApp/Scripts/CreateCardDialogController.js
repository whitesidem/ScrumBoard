/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />
/// <reference path="Dialogs/SimpleEnterStringDialogController.js" />

SkilzJs.namespace('controller');
SkilzJs.controller.CreateCardDialogController = (function ($scope, $dialog, $http) {

    $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/Templates/ScrumBoard/CreateListItemDialog.htm',
        controller: SkilzJs.controller.shared.dialogs.SimpleEnterStringDialogController,
        resolve: { dialogModel: function () { return { title: "Create New Card", text: "Enter title for new card" }; } }
    };


    $scope.openDialog = function (listId) {
        var d = $dialog.dialog($scope.opts);
        d.open().then(function (cardTitle) {
            if (cardTitle) {
                $http.post("api/ScrumBoardRestApi/CreateCard", { "title": cardTitle, "listId" : listId });
            }
        });
    };

});

SkilzJs.controller.CreateCardDialogController.$inject = ["$scope", "$dialog", "$http"];
