/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

angular.module("ScrumBoardApp")
.directive('scrumCardListItem', function () {
    return {
//        restrict: 'E',
        restrict: 'C',
        // This HTML will replace the zippy directive.
        replace: true,
        transclude: true,
        scope: { innerTitle: '@cat' },
        templateUrl: '/Templates/ScrumBoard/ScrumCard.htm',
//        template: '<div class="scrumCard">' +
//                '{{innerTitle}}' +
//                '<p ng-transclude>' +
//                '</p>' +
//                '</div>'
//        // The linking function will add behavior to the template
/*        link: function (scope, element, attrs) {
            // Title element
            var title = angular.element(element.children()[0]),
            // Opened / closed state
            opened = true;

            // Clicking on title should open/close the zippy
            title.bind('click', toggle);

            // Toggle the closed/opened state
            function toggle() {
                opened = !opened;
                element.removeClass(opened ? 'closed' : 'opened');
                element.addClass(opened ? 'opened' : 'closed');
            }

            // initialize the zippy
            toggle();
        }
        */
    }
});