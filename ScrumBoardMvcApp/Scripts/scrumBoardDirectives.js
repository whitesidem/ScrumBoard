﻿/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
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

            var dragScroller = function (e) {
                console.log(e.pageY);
                var $this = $(this);
                var $inner = $('.listItem', $this);
                console.log($inner.height());
                var h = $inner.height() + 13;
                var offset = $this.offset();
                var position = (e.pageY - offset.top) / $this.height();
                //console.log(position);
                if (position < 0.15) {
                    $this.stop().animate({ scrollTop: 0 }, 1000);
                }
                else if (position < 0.33) {
                    $this.stop().animate({ scrollTop: 0 }, 15000);
                }
                else if (position > 0.75) {
                    $this.stop().animate({ scrollTop: h }, 1000);
                }
                else if (position > 0.66) {
                    $this.stop().animate({ scrollTop: h }, 15000);
                } else {
                    $this.stop();
                }
            };

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
                delay: 300,
                start: function () {
                    var $this = $(this);
                    var $scrollarea = $this.closest('.listItemScroll');
                    $scrollarea.bind('mousemove',dragScroller);
                },
                stop: function () {
                    console.log('stop');
                    var $this = $(this);
                    var $scrollarea = $this.closest('.listItemScroll');
                    $scrollarea.unbind('mousemove', dragScroller);
                }
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
