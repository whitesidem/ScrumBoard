/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/Angular/angular.js" />
/// <reference path="/Scripts/Shared/global.js" />
/// <reference path="/Scripts/models.js" />



angular.module("ScrumBoardApp")
//.directive('scrumCardListItem', function () {
.directive('scrumcarditem', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: false,
//        scope: { innerTitle: '@cardTitle'},
        templateUrl: '/Templates/ScrumBoard/ScrumCard.htm'     
    };
});

angular.module("ScrumBoardApp")
.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $cont = $('#outerScrumBoard');

            element.draggable({
                revert: true,
                helper: 'clone',
                zindex: 99999990,
                appendTo: '#outerScrumBoard',
                //                containment: [10, $('#outerScrumBoard').offset().top, $('#outerScrumBoard').offset().right, $('#outerScrumBoard').offset().bottom], 
                containment: $cont[0],
                scroll: true,
                scrollSensitivity: 10,
                scrollSpeed: 50, 
                cursor: "crosshair",
                delay: 300
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
//                    var fnDropListener = scope.$parent.$eval(attrs.uiDropListener);
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
