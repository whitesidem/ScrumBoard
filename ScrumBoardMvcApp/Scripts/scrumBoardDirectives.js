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
        scope: false,
        link: function (scope, element, attrs) {

            element.draggable({
                revert: false,
                helper: 'clone',
                //helper: scope.cloneForDrag,
                zindex: 99999990,
                appendTo: '#outerScrumBoard',
                //                                appendTo: '.listItemScroll:first',
                //                containment: [10, $('#outerScrumBoard').offset().top, $('#outerScrumBoard').offset().right, $('#outerScrumBoard').offset().bottom], 
                containment: '#outerScrumBoard',
                //                containment: '.listItemScroll',
                scroll: true,
                scrollSensitivity: 10,
                scrollSpeed: 50,
                cursor: "crosshair",
                cursorAt: { left: -2, top: 5 },
                delay: 300,
                start: function () {
//                    console.log('start drag');
                    scope.setDragging(true);
                },
                stop: function () {
//                    console.log('stop drag');
                    scope.setDragging(false);
                }
            });
        }
    };
});


angular.module("ScrumBoardApp")
.directive('uiDropListener', function () {
    return {
        restrict: 'A',
        link: function (scope, eDroppable, attrs) {
            eDroppable.droppable({
                drop: function (event, ui) {
                    console.log("DROP DETECTED!!!!");

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
