SkilzJs.namespace('controller');

SkilzJs.controller.OpenListDialogController = (function ($scope, $dialog) {

    //    $scope.Potato = "King Edward";

    $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/Templates/ScrumBoard/CreateListItemDialog.htm',
        controller: SkilzJs.controller.TitleDialogController, 
        resolve: { dialogModel: function () { return { title:"Create New List", text: "Enter List title" }; } }
    };


    $scope.openDialog = function () {

        console.dir($scope);

        var d = $dialog.dialog($scope.opts);
        d.open().then(function (listTitle) {
            if (listTitle) {
                $scope.addDraftListWithName(listTitle);
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

// the dialog is injected in the specified controller
SkilzJs.controller.TitleDialogController = (function ($scope, dialog, dialogModel) {

    console.dir($scope);

    $scope.dialogModel = dialogModel;
    $scope.close = function () {
        dialog.close($scope.listTitle);
    };
    $scope.cancel = function () {
        dialog.close();
    };
});

SkilzJs.controller.TitleDialogController.$inject = ["$scope", "dialog", "dialogModel"];