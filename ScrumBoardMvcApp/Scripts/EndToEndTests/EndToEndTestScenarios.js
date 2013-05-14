    /// <reference path="/Scripts/External/Angular/angular-scenario.js" />
/// <reference path="/Scripts/External/Angular/angular-mocks.js" />
/// <reference path="/TestScripts/jasmine-1.3.1/jasmine.js" />
/// <reference path="/Scripts/Shared/global.js" />



describe("End-to-End Tests", function () {

    // This URL is for this app running under the Visual Studio
    // web development server (Cassini). The port number is assigned
    // in the "Web" section of the web apps project's 
    // (see the "Specific port" setting).
    var url = "http://localhost:54120/ScrumBoard?isTest=true";

    beforeEach(function () {
        console.log("beforeEach");
    });

    afterEach(function () {
        console.log("afterEach");
    });

    it("can browse to site", function () {
        browser().navigateTo(url);
    });


    it("can add a new list", function () {
        browser().navigateTo(url);
        element('#addNewListBtn').click();
        input("listTitle").enter("Backlog");
        element("#okBtn").click();



        element('#addNewListBtn').click();
        input("listTitle").enter("In dev");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("New Lister");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("Web Trends");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("Web Trends2");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("Web Trends3");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("Web Trends4");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("This is an awefully long task to explain in mere words and I'm not quite sure I can can pinpoint the puspose of this story, in fact its probably multiple stories really. Oh Well.");
        element("#okBtn").click();


        element('.addCard:eq(0)').click();
        input("listTitle").enter("New Site");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("New Site2");
        element("#okBtn").click();

        element('.addCard:eq(0)').click();
        input("listTitle").enter("New Site3");
        element("#okBtn").click();


        element('.addCard:eq(0)').click();
        input("listTitle").enter("New Site4");
        element("#okBtn").click();
        
        element('.addCard:eq(0)').click();
        input("listTitle").enter("Disconnected Promotion");
        element("#okBtn").click();
        
        element('.addCard:eq(1)').click();
        input("listTitle").enter("Prod Page Refactor");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("Performance");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("Another long winded explanation of probably quite a simple theory that is suposed to only take an hour but needs lots of detail. Again, oh well.");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("Web Trends5");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("Web Trends6");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("Web Trends7");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("Web Trends8");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("New Site7");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("New Site5");
        element("#okBtn").click();

        element('.addCard:eq(1)').click();
        input("listTitle").enter("New Site6");
        element("#okBtn").click();


        element('.addCard:eq(1)').click();
        input("listTitle").enter("New Site7");
        element("#okBtn").click();
        
        element('#addNewListBtn').click();
        input("listTitle").enter("Dev Done");
        element("#okBtn").click();

        //        expect(window.binding("products.Total")).toBeGreaterThan(0);
        //        expect(window.binding("product.Name")).toContain("Dom Perignon");
    });


});
