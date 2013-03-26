/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />
/// <reference path="Dialogs/SimpleEnterStringDialogController.js" />


SkilzJs.namespace('controller');
SkilzJs.controller.CreateListDialogController = (function ($scope, $dialog, $http) {

    $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/Templates/ScrumBoard/CreateListItemDialog.htm',
        controller: SkilzJs.controller.shared.dialogs.SimpleEnterStringDialogController,
        resolve: { dialogModel: function () { return { title: "Create New List", text: "Enter title for new list" }; } }
    };


    $scope.openDialog = function () {

        console.dir($scope);

        var d = $dialog.dialog($scope.opts);
        d.open().then(function (listTitle) {
            if (listTitle) {
                $http.post("api/ScrumBoardRestApi/CreateList", { "title": listTitle });
//                $scope.addDraftListWithName(listTitle);
            }
        });
    };

    //    $scope.openMessageBox = function () {
    //        var title = 'This is a message box';
    //        var msg = 'This is the content of the message box';
    //        var btns = [{ result: 'cancel', label: 'Cancel' }, { result: 'ok', label: 'OK', cssClass: 'btn-primary'}];

    //        $dialog.messageBox(title, msg, btns)
    //      .open()
    //      .then(function (result) {
    //          alert('dialog closed with result: ' + result);
    //      });
    //    };
});

