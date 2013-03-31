/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/Angular/angular.js" />
/// <reference path="/Scripts/Shared/global.js" />
/// <reference path="/Scripts/models.js" />



angular.module("ScrumBoardApp")
.directive('scrumCardListItem', function () {
    return {
        restrict: 'C',
        replace: true,
        transclude: true,
        scope: { innerTitle: '@cardTitle', cardId: '@cardId', model: '@model', index:"@index" },
        templateUrl: '/Templates/ScrumBoard/ScrumCard.htm'
    };
});

angular.module("ScrumBoardApp")
.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                revert: true
            });
        }
    };
});

//angular.module("ScrumBoardApp")
//.directive('droppable', function () {
//    return {
//        restrict: 'A',
//        link: function (scope, element, attrs) {
//            element.droppable({
//                drop: function (event, ui) {
//                    alert(angular.element(ui.draggable).data('testMe'));
//                    alert(angular.element(ui.draggable).data('cardId'));
//                    
//                    var dropCard = angular.element(this);
//                    var dragArea = angular.element(ui.draggable).parent;
//                    console.dir(dropCard);
//                    //                    alert(dragIndex);
//                }
//            });
//        }
//    };
//});


angular.module("ScrumBoardApp")
.directive('uiDropListener', function () {
    return {
        restrict: 'A',
        link: function (scope, eDroppable, attrs) {
            eDroppable.droppable({
                drop: function (event, ui) {
                    var fnDropListener = scope.$eval(attrs.uiDropListener);
                    if (fnDropListener && angular.isFunction(fnDropListener)) {
                        var eDraggable = angular.element(ui.draggable);
                        fnDropListener(eDraggable, eDroppable, event, ui);
                    }
                }
            });
        }
    };
});
