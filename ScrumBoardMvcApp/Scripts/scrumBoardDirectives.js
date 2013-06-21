/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/Angular/angular.js" />
/// <reference path="/Scripts/Shared/global.js" />
/// <reference path="/Scripts/models.js" />

(function () {

    var app = angular.module("ScrumBoardApp");

    app.directive('scrumcarditem', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: false,
                //        scope: { innerTitle: '@cardTitle'},
                templateUrl: 'Templates/ScrumBoard/ScrumCard.htm'
            };
        });

    app.directive('addscrumcarditem', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: false,
                templateUrl: 'Templates/ScrumBoard/AddScrumCard.htm'
            };
        });


    app.directive('scrumcarditemtrailer', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: false,
                templateUrl: 'Templates/ScrumBoard/ScrumCardTrailer.htm'
            };
        });

    app.directive('draggable', function () {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element, attrs) {

                    element.draggable({
                        revert: false,
                        helper: 'clone',
                        zindex: 99999990,
                        appendTo: '#outerScrumBoard',
                        containment: '#outerScrumBoard',
                        scroll: true,
                        scrollSensitivity: 10,
                        scrollSpeed: 50,
                        cursor: "crosshair",
                        cursorAt: { left: -2, top: 5 },
                        delay: 300,
                        opacity: 0.75,
                        start: function () {
                            //                    console.log('start drag');
                            scope.setDragging(true);
                        },
                        stop: function () {
                            //                    console.log('stop drag');
                            scope.setDragging(false);
                        },
                        refreshPositions: true
                    });
                }
            };
        });


    app.directive('uiDropListener', function () {
            return {
                restrict: 'A',
                link: function (scope, eDroppable, attrs) {
                    eDroppable.droppable({
                        drop: function (event, ui) {
                            //                    console.log("DROP DETECTED!!!!");
                            var fnDropListener = scope.$eval(attrs.uiDropListener);
                            if (fnDropListener && angular.isFunction(fnDropListener)) {
                                var eDraggable = angular.element(ui.draggable);
                                fnDropListener(eDraggable, eDroppable, event, ui);
                            }
                        },
                        hoverClass: "cardHover",
                        tolerance: "pointer"
                    });
                }
            };
        });

     app.directive('ngbkFocus', function () {
            return {
                link: function (scope, element, attrs, controller) {
                    element[0].focus();
                }
            };
        });

})();