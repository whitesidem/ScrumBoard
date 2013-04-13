/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />
/// <reference path="External/mCustomScrollbar/jquery.mCustomScrollbar.js" />

angular.module("ScrumBoardApp", ['ui.bootstrap']);

angular.module("ScrumBoardApp").ready(
    function () {
        //        $('#scrumBoard').mCustomScrollbar({
        //            autoHideScrollbar: false,
        //            horizontalScroll: false,
        //            scrollButtons: {
        //                enable: true
        //            },
        //            advanced: {
        //                autoExpandHorizontalScroll: true
        //            }
        //        });

        //        $('#outerScrumBoard').mCustomScrollbar({
        //            autoHideScrollbar: false,
        //            horizontalScroll: true,
        //            scrollButtons: {
        //                enable: true
        //            },
        //            advanced: {
        //                autoExpandHorizontalScroll: true
        //            }
        //        });

//        $('.listItem').mCustomScrollbar();

//        $('.listItem').slimScroll({
//            position: 'left',
//            height: 'auto',
//            railVisible: true,
//            alwaysVisible: true
//        });

    } ()
);

